import { GroceryResponseDto } from './groceryResponse.dto';

export class CartItemResponseDto {
  item: GroceryResponseDto;
  quantity: number;
}

export class CartResponseDto {
  items: CartItemResponseDto[];
  total: number;
  updatedAt: Date;
}
