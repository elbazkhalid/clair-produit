import { ScanHistoryItem, ProductData, Language } from '../types/product';

const HISTORY_KEY = 'clairproduit_scan_history_v1';
const FAVORITES_KEY = 'clairproduit_favorites_v1';
const LANG_KEY = 'clairproduit_language_v1';

export function getStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'ar' || saved === 'fr') return saved;
    // Default to French for Morocco / bilingual
    return 'fr';
  } catch {
    return 'fr';
  }
}

export function saveStoredLanguage(lang: Language) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (err) {
    console.error('Failed to save language', err);
  }
}

export function getScanHistory(): ScanHistoryItem[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(product: ProductData): ScanHistoryItem[] {
  try {
    const current = getScanHistory();
    const filtered = current.filter(item => item.barcode !== product.barcode);
    const favorites = getFavorites();
    const isFav = favorites.some(f => f.barcode === product.barcode);

    const newItem: ScanHistoryItem = {
      id: `${product.barcode}-${Date.now()}`,
      barcode: product.barcode,
      product,
      scannedAt: Date.now(),
      isFavorite: isFav
    };

    const updated = [newItem, ...filtered].slice(0, 50); // keep last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save scan history', err);
    return [];
  }
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (err) {
    console.error('Failed to clear history', err);
  }
}

export function getFavorites(): ProductData[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(product: ProductData): boolean {
  try {
    const current = getFavorites();
    const exists = current.some(p => p.barcode === product.barcode);
    let updated: ProductData[];
    let isNowFavorite: boolean;

    if (exists) {
      updated = current.filter(p => p.barcode !== product.barcode);
      isNowFavorite = false;
    } else {
      updated = [product, ...current];
      isNowFavorite = true;
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));

    // Also update history favorite flag
    const history = getScanHistory();
    const updatedHistory = history.map(item => {
      if (item.barcode === product.barcode) {
        return { ...item, isFavorite: isNowFavorite };
      }
      return item;
    });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));

    return isNowFavorite;
  } catch (err) {
    console.error('Failed to toggle favorite', err);
    return false;
  }
}

export function isProductFavorite(barcode: string): boolean {
  try {
    const favs = getFavorites();
    return favs.some(f => f.barcode === barcode);
  } catch {
    return false;
  }
}
