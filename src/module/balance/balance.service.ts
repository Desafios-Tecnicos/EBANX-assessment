import { Injectable } from '@nestjs/common';
import { BalanceService } from './balance.interface';

@Injectable()
export class BalanceServiceImpl implements BalanceService {}
