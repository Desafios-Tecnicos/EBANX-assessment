import { Module } from '@nestjs/common';
import { CacheInMemoryModule } from '../cache/cache.module';
import { BalanceController } from './balance.controller';
import { BalanceServiceImpl } from './balance.service';

@Module({
  imports: [CacheInMemoryModule],
  providers: [
    { provide: 'BalanceService', useClass: BalanceServiceImpl }
  ],
  controllers: [BalanceController],
  exports: [
    { provide: 'BalanceService', useClass: BalanceServiceImpl }
  ]
})
export class BalanceModule { }
