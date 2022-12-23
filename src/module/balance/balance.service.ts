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
    console.log(balance);

    if (isNil(balance)) {
      return null;
    }
    balance.balance -= value.amount;

    this._cacheService.set(`ac_${value.origin}`, balance);
    return { origin: balance };
  }
  async getBalance(key: any): Promise<any> {
    return this._cacheService.get(key);
  }


  async deposit(value: any): Promise<any> {
    return this._cacheService.get(`ac_${value.destination}`).then((res: any) => {

      const amount = !isNil(res) ? res.balance + value.amount : value.amount;

      return this._cacheService.set(`ac_${value.destination}`, { balance: amount, id: value.destination }).then((res) => {
        return {
          destination: res
        };
      });

    });

  }
  async transfer(value: any): Promise<any> {
    return this._cacheService.get(`ac_${value.origin}`).then(from => {
      if (isNil(from)) {
        return null;

      }
      return this._cacheService.get(`ac_${value.destination}`).then(to => {

        from.balance -= value.amount;
        const newBalance = {
          id: to?.id || value.destination,
          balance: !isNil(to) ? to.balance + value.amount : value.amount,
        };

        return this._cacheService.set(`ac_${value.destination}`, newBalance).then(() => {

          this._cacheService.set(`ac_${value.origin}`, from);

          return { destination: newBalance, origin: from };
        });
      });
    });



  }

  resetValues(): Promise<any> {
    return this._cacheService.reset();
  }

}
