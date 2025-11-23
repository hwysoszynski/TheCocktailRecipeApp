// Service Worker for Cocktail Recipe App
// Cache version - increment this to force cache updates
const CACHE_VERSION = 'v1.0.0';
const STATIC_CACHE = `cocktail-app-static-${CACHE_VERSION}`;
const IMAGE_CACHE = `cocktail-app-images-${CACHE_VERSION}`;
const FONT_CACHE = `cocktail-app-fonts-${CACHE_VERSION}`;

// Assets to cache on install (minimal - Vite handles bundling)
// The service worker will cache other assets as they're requested
const STATIC_ASSETS = [
  '/',
  '/index.html',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...', CACHE_VERSION);
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS).catch((err) => {
          console.warn('[Service Worker] Failed to cache some static assets:', err);
        });
      }),
      // Pre-create image and font caches
      caches.open(IMAGE_CACHE),
      caches.open(FONT_CACHE),
    ]).then(() => {
      console.log('[Service Worker] Installation complete');
      // Force activation of new service worker
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Delete old caches that don't match current version
          if (
            cacheName.startsWith('cocktail-app-') &&
            cacheName !== STATIC_CACHE &&
            cacheName !== IMAGE_CACHE &&
            cacheName !== FONT_CACHE
          ) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Activation complete');
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Cache-first strategy for static assets (HTML, CSS, JS)
  // Handles both development and production builds
  if (
    url.pathname.endsWith('.html') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.mjs') ||
    url.pathname.endsWith('.tsx') ||
    url.pathname.endsWith('.ts') ||
    url.pathname === '/' ||
    url.pathname.startsWith('/src/') ||
    url.pathname.startsWith('/assets/') // Vite production assets
  ) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Stale-while-revalidate for images
  if (
    url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/i) ||
    url.hostname.includes('unsplash.com') ||
    url.hostname.includes('images.unsplash.com')
  ) {
    event.respondWith(staleWhileRevalidate(request, IMAGE_CACHE));
    return;
  }

  // Cache-first for fonts
  if (url.pathname.match(/\.(woff|woff2|ttf|eot|otf)$/i)) {
    event.respondWith(cacheFirst(request, FONT_CACHE));
    return;
  }

  // Network-first for API calls and other requests
  event.respondWith(networkFirst(request));
});

/**
 * Cache-first strategy: Check cache first, fallback to network
 */
async function cacheFirst(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Cache-first error:', error);
    // Return a fallback response if available
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

/**
 * Stale-while-revalidate strategy: Return cached version immediately,
 * then update cache in background
 */
async function staleWhileRevalidate(request, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    // Fetch fresh version in background
    const fetchPromise = fetch(request).then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    }).catch((error) => {
      console.warn('[Service Worker] Background fetch failed:', error);
    });
    
    // Return cached version immediately if available
    if (cachedResponse) {
      // Don't wait for background fetch
      fetchPromise.catch(() => {});
      return cachedResponse;
    }
    
    // If no cache, wait for network
    return await fetchPromise;
  } catch (error) {
    console.error('[Service Worker] Stale-while-revalidate error:', error);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Image not available offline', { 
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * Network-first strategy: Try network first, fallback to cache
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.warn('[Service Worker] Network request failed, trying cache:', error);
    
    // Try cache as fallback
    const cache = await caches.open(STATIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response
    return new Response('Offline - content not available', {
      status: 503,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

