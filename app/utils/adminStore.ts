import fs from 'node:fs';
import path from 'node:path';

export const STORE_FILE = path.join(process.cwd(), 'app', 'api', 'data', 'admin-store.json');

let memoryStore: any = null;
let lastModified: number = 0;

export function getStoreData() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const stats = fs.statSync(STORE_FILE);
      if (memoryStore && lastModified === stats.mtimeMs) {
        return memoryStore;
      }
      const content = fs.readFileSync(STORE_FILE, 'utf8');
      memoryStore = JSON.parse(content);
      lastModified = stats.mtimeMs;
      return memoryStore;
    }
  } catch (error) {
    console.error("Error reading admin store:", error);
  }
  return {};
}
