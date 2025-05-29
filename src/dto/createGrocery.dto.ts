import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateGroceryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  inventory: number;

  @IsString()
  @IsNotEmpty()
  category: string;
}
