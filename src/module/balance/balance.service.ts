import { Inject, Injectable } from '@nestjs/common';
import { CacheInMemoryService } from '../cache/cache.service';
import { BalanceService } from './balance.interface';
import { isNil } from 'lodash';
@Injectable()
export class BalanceServiceImpl implements BalanceService {
  // eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
  constructor(@Inject('CacheService') private _cacheService: CacheInMemoryService) { }

  async withdraw(value: any): Promise<any> {
    const balance: any = await this._cacheService.get(`ac_${value.origin}`);

    if (isNil(balance)) {
      return null;
    }
    balance.balance = balance - value.amount;
    this._cacheService.set(`ac_${value.origin}`, balance);
    return balance;
  }
  async getBalance(key: any): Promise<any> {
    console.log(key);
    return this._cacheService.get(key);
  }


  async deposit(value: any): Promise<any> {

    return this._cacheService.get(`ac_${value.destination}`).then((res: any) => {

      const amount = !isNil(res) ? res.balance + value.amount : value.amount;

      return this._cacheService.set(`ac_${value.destination}`, { balance: amount, id: value.destination });

    });

  }
  async transfer(value: any): Promise<any> {
    const origin: any = await this._cacheService.get(`ac_${value.origin}`);

    if (isNil(origin)) {
      return null;

    }

    const destination: any = await this._cacheService.get(`ac_${value.destination}`);

    origin.balance -= value.amount;
    destination.balance += value.amount;

    return this._cacheService.set(`ac_${value.destination}`, destination).then((res) => {

      this._cacheService.set(`ac_${value.origin}`, origin);

      return res;
    });
  }

  resetValues(): Promise<any> {
    return this._cacheService.reset();
  }

}
