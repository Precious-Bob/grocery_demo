import { IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';

export class UpdateGroceryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  inventory?: number;

  @IsString()
  @IsOptional()
  category?: string;
}
