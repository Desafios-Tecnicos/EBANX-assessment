import { Controller, Get, HttpCode, HttpStatus, Inject, Post, Query, Res } from '@nestjs/common';
import { BalanceService } from './balance.interface';
import { isNil } from 'lodash';
import { Response } from 'express';

@Controller()

export class BalanceController {
  constructor(
    @Inject('BalanceService') private _balanceService: BalanceService
    // eslint-disable-next-line no-empty-function
  ) {

  }

  @HttpCode(HttpStatus.OK)
  @Post('reset')
  resetCache(): Promise<void> {
    return this._balanceService.resetValues();
  }

  @Get('balance')
  getBalance(@Query('account_id') id: string, @Res() res: Response): Promise<any> {
    return this._balanceService.getBalance(id).then((response) => {
      if (isNil(response)) {
        console.log('áqui');
        return res.status(404).json(0);
      }
      return res.status(200).json(response);
    });
  }
}