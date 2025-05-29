import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class AddItemDto {
  @IsString()
  @IsNotEmpty()
  itemId: string;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
