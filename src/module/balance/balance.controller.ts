import { Body, Controller, Get, HttpCode, HttpStatus, Inject, Post, Query, Res } from '@nestjs/common';
import { BalanceService } from './balance.interface';
import { isNil } from 'lodash';
import { Response } from 'express';
import { EventDto } from 'src/types/event.dto';

@Controller()

export class BalanceController {
  constructor(
    @Inject('BalanceService') private _balanceService: BalanceService
    // eslint-disable-next-line no-empty-function
  ) {

  }

  @HttpCode(HttpStatus.OK)
  @Post('reset')
  resetCache(@Res() res: Response): any {
    this._balanceService.resetValues();
    return res.status(200).send('OK');
  }

  @Get('balance')
  getBalance(@Query('account_id') id: string, @Res() res: Response): Promise<any> {
    return this._balanceService.getBalance(`ac_${id}`).then((response) => {
      if (isNil(response)) {
        return res.status(404).json(0);
      }
      return res.status(200).json(response.balance);
    });
  }

  @Post('event')
  events(@Body() { type, ...body }: EventDto, @Res() res: Response): Promise<any> {

    return this._balanceService[type](body).then(response => {
      if (isNil(response)) {
        return res.status(404).json(0);
      }
      return res.status(201).json(response);
    });


  }
}