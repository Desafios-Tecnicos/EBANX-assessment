import { CacheModule, Module } from '@nestjs/common';
import { CacheInMemoryService } from './cache.service';

@Module({
  imports: [CacheModule.register({ isGlobal: true, ttl: 0 })],
  providers: [
    { provide: 'CacheService', useClass: CacheInMemoryService }
  ],
  exports: [
    { provide: 'CacheService', useClass: CacheInMemoryService }
  ]
})
export class CacheInMemoryModule { }
