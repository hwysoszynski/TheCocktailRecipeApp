import { Cocktail, MOCK_COCKTAILS } from '../types/cocktail';

const STORAGE_KEYS = {
  COCKTAILS: 'cocktail-app-cocktails',
  DARK_MODE: 'cocktail-app-dark-mode',
} as const;

/**
 * Load cocktails from localStorage or return mock data if not found
 */
export function loadCocktails(): Cocktail[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COCKTAILS);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Validate that it's an array
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading cocktails from localStorage:', error);
  }
  // Return mock data if nothing is stored or if there's an error
  return MOCK_COCKTAILS;
}

/**
 * Save cocktails to localStorage
 */
export function saveCocktails(cocktails: Cocktail[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COCKTAILS, JSON.stringify(cocktails));
  } catch (error) {
    console.error('Error saving cocktails to localStorage:', error);
  }
}

/**
 * Load dark mode preference from localStorage
 */
export function loadDarkMode(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    if (stored !== null) {
      return stored === 'true';
    }
  } catch (error) {
    console.error('Error loading dark mode from localStorage:', error);
  }
  return false;
}

/**
 * Save dark mode preference to localStorage
 */
export function saveDarkMode(darkMode: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, darkMode.toString());
  } catch (error) {
    console.error('Error saving dark mode to localStorage:', error);
  }
}

/**
 * Clear all stored data (useful for resetting the app)
 */
export function clearStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.COCKTAILS);
    localStorage.removeItem(STORAGE_KEYS.DARK_MODE);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

