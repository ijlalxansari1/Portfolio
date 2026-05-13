/**
 * Secure & Robust Storage Manager
 * Prevents data corruption and handles quota issues.
 */
export const storage = {
  get: <T>(key: string, fallback: T): T => {
    if (typeof window === 'undefined') return fallback;
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(`[Storage] Failed to parse key "${key}":`, e);
      return fallback;
    }
  },

  set: (key: string, data: any): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      localStorage.setItem(key, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent('storage-sync', { detail: { key } }));
      return true;
    } catch (e) {
      console.error(`[Storage] Failed to set key "${key}". Possible quota exceeded.`, e);
      return false;
    }
  },

  remove: (key: string) => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },

  clearAll: () => {
    if (typeof window === 'undefined') return;
    const keysToRemove = Object.keys(localStorage).filter(k => k.startsWith('admin-'));
    keysToRemove.forEach(k => localStorage.removeItem(k));
  },

  audit: () => {
    if (typeof window === 'undefined') return { totalSize: 0, items: 0 };
    let total = 0;
    for (let x in localStorage) {
      if (localStorage.hasOwnProperty(x)) {
        total += ((localStorage[x].length + x.length) * 2);
      }
    }
    return {
      totalSize: (total / 1024).toFixed(2) + " KB",
      items: Object.keys(localStorage).length
    };
  }
};
