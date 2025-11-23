/**
 * Service Worker Registration
 * Handles registration and updates of the service worker
 */

export function registerServiceWorker() {
  if ('serviceWorker' in navigator && typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('[Service Worker] Registration successful:', registration.scope);

          // Check for updates periodically
          setInterval(() => {
            registration.update();
          }, 60 * 60 * 1000); // Check every hour

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker available
                  console.log('[Service Worker] New version available');
                  // Optionally notify user or auto-reload
                  if (confirm('A new version of the app is available. Reload to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('[Service Worker] Registration failed:', error);
        });

      // Handle service worker updates
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[Service Worker] Controller changed, reloading page');
        window.location.reload();
      });
    });
  } else {
    console.warn('[Service Worker] Not supported in this browser');
  }
}

/**
 * Unregister service worker (useful for development)
 */
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister().then((success) => {
        if (success) {
          console.log('[Service Worker] Unregistered successfully');
        }
      });
    });
  }
}

