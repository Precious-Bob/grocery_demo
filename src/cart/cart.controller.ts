import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddItemDto } from 'src/dto/addItem.dto';
import { UpdateItemDto } from 'src/dto/updateItem.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('items')
  async addItem(
    @User('userId') userId: string,
    @Body() addItemDto: AddItemDto,
  ) {
    return this.cartService.addItem(userId, addItemDto);
  }

  @Put('items/:itemId')
  async updateItem(
    @User('userId') userId: string,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdateItemDto,
  ) {
    return this.cartService.updateItem(userId, itemId, updateItemDto);
  }

  @Delete('items/:itemId')
  async removeItem(
    @User('userId') userId: string,
    @Param('itemId') itemId: string,
  ) {
    return this.cartService.removeItem(userId, itemId);
  }

  @Get()
  async getCart(@User('userId') userId: string) {
    return this.cartService.getCartDetails(userId);
  }
}
