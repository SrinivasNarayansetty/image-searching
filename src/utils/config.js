export const API_CONFIG = {
  apiKey: 'b0bf8bb928d0ee3aa069f809f9aeca73',
  nojsoncallback: 1,
  responseFormat: 'json',
  perPage: 30,
  safeSearch: 1, // 1 = safe, 2 = moderate, 3 = restricted (unsafe)
  contentType: 1, // 1 = photos only (no screenshots, graphics, etc.)
};

export const APP_CONFIG = {
  searchListLimit: 5,
  debounceDelay: 800,
  scrollThreshold: 300,
};

export const STORAGE_KEYS = {
  searchHistory: 'searchInputsList',
};

const config = {
  ...API_CONFIG,
  ...APP_CONFIG,
  ...STORAGE_KEYS,
};

export default config;