import { EventTypes } from './event-types.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class EventDto {

  @IsEnum(EventTypes)
  @IsNotEmpty()
  type: EventTypes;
  @IsOptional()
  @IsNumber()
  destination?: number;
  @IsOptional()
  @IsNumber()
  origin?: number;
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}