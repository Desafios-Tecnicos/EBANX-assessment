import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { HttpLogMiddleware } from './middleware/http-log.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
// eslint-disable-next-line prettier/prettier
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLogMiddleware).forRoutes('*');
  }
}
