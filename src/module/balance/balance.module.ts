import { CacheModule, Module } from '@nestjs/common';
import { BalanceServiceImpl } from './balance.service';

@Module({
  imports: [CacheModule.register({ isGlobal: true, ttl: 0 })],
  providers: [
    { provide: 'BalanceService', useClass: BalanceServiceImpl }
  ],
  exports: [
    { provide: 'BalanceService', useClass: BalanceServiceImpl }
  ]
})
export class BalanceModule { }
