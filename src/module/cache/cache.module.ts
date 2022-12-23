import { CacheModule, Module } from '@nestjs/common';
import { CacheInMemoryService } from './cache.service';

@Module({
  imports: [CacheModule.register({ isGlobal: true, ttl: 1800 })],
  providers: [
    { provide: 'CacheService', useClass: CacheInMemoryService }
  ],
  exports: [
    { provide: 'CacheService', useClass: CacheInMemoryService }
  ]
})
export class CacheInMemoryModule { }
