/* eslint-disable no-unused-vars */
export interface CacheService {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<unknown>;
  reset(key: string): Promise<void>;
}
