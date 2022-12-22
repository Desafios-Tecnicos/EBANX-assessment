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


    balance.amount -= value.amount;
    this._cacheService.set(`ac_${value.origin}`, balance);
    return balance;
  }
  async getBalance(key: any): Promise<any> {
    return this._cacheService.get(key);
  }


  async deposit(value: any): Promise<any> {
    this._cacheService.get(`ac_${value.destination}`).then((res: any) => {
      const amount = res?.amount + value.amount;
      return this._cacheService.set(`ac_${value.destination}`, { ...value, amount });

    });
    return null;
  }
  async transfer(value: any): Promise<any> {
    const origin: any = await this._cacheService.get(`ac_${value.origin}`);

    const destination: any = await this._cacheService.get(`ac_${value.destination}`);

    if (isNil(origin) || isNil(destination)) {
      throw new Error('NOTFOUND');
    }

    origin.amount -= value.amount;
    destination.amount += value.amount;
    return this._cacheService.set(`ac_${value.destination}`, destination).then((res) => {
      this._cacheService.set(`ac_${value.origin}`, origin);
      return res;
    });
  }

  resetValues(): Promise<any> {
    return this._cacheService.reset();
  }

}
