import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HttpLogMiddleware } from './middleware/http-log.middleware';
import { BalanceModule } from './module/balance/balance.module';
import { CacheInMemoryModule } from './module/cache/cache.module';

@Module({
  imports: [CacheInMemoryModule, BalanceModule],

})
// eslint-disable-next-line prettier/prettier
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLogMiddleware).forRoutes('*');
  }
}
