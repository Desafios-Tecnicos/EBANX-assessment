/* eslint-disable no-unused-vars */
export interface BalanceService {
  event(value: any): Promise<any>;
  getBalance(key: any): Promise<any>;
}
