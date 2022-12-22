import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { CacheService } from './cache.interface';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheInMemoryService implements CacheService {
  // eslint-disable-next-line no-empty-function, no-unused-vars
  constructor(@Inject(CACHE_MANAGER) private _cache: Cache) {

  }
  get(key: string): Promise<unknown> {
    return this._cache.get(key);
  }
  reset(): Promise<void> {
    return this._cache.reset();
  }
  set(key: string, value: any): Promise<void> {
    return this._cache.set(key, value);
  }
}