/* eslint-disable no-unused-vars */
export interface BalanceService {
  withdraw(value: any): Promise<any>;
  transfer(value: any): Promise<any>;
  deposit(value: any): Promise<any>;
  getBalance(key: any): Promise<any>;
  resetValues(): Promise<void>
}
