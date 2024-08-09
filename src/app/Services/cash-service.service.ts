import { Injectable } from '@angular/core';

interface CacheEntry {
  url: string;
  response: any;
  lastRead: number;
}

const MAX_CACHE_AGE = 300000;

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private cache = new Map<string, CacheEntry>();

  get(url: string): any | null {
    const cached = this.cache.get(url);

    if (!cached) {
      return null;
    }

    const isExpired = Date.now() - cached.lastRead > MAX_CACHE_AGE;
    return isExpired ? null : cached.response;
  }

  put(url: string, response: any): void {
    const entry: CacheEntry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);
    this.cleanCache();
  }

  private cleanCache() {
    const expiredTime = Date.now() - MAX_CACHE_AGE;
    this.cache.forEach((entry, url) => {
      if (entry.lastRead < expiredTime) {
        this.cache.delete(url);
      }
    });
  }
}
