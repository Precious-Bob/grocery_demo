import { IsNumber, IsPositive, IsOptional } from 'class-validator';

export class UpdateItemDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity?: number;
}
