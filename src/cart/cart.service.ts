import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Cart } from './schemas/cart.schema';
import { AddItemDto } from 'src/dto/addItem.dto';
import { UpdateItemDto } from 'src/dto/updateItem.dto';
import { CartResponseDto, CartItemResponseDto } from 'src/dto/cartResponse.dto';
import { GroceryService } from 'src/grocery/grocery.service';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    private groceryService: GroceryService,
  ) {}

  private async getCart(userId: string): Promise<Cart> {
    return this.cartModel.findOne({ userId }).exec();
  }

  private async createCart(userId: string): Promise<Cart> {
    const newCart = new this.cartModel({ userId, items: [] });
    return newCart.save();
  }

  async addItem(
    userId: string,
    addItemDto: AddItemDto,
  ): Promise<CartResponseDto> {
    // Validate the grocery item exists
    const groceryItem = await this.groceryService.findOne(addItemDto.itemId);

    // Check inventory
    if (groceryItem.inventory < addItemDto.quantity) {
      throw new BadRequestException('Not enough inventory');
    }

    let cart = await this.getCart(userId);
    if (!cart) {
      cart = await this.createCart(userId);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() === addItemDto.itemId,
    );

    if (itemIndex > -1) {
      // Update quantity if item already exists
      cart.items[itemIndex].quantity += addItemDto.quantity;
    } else {
      // Add new item
      cart.items.push({
        itemId: new Types.ObjectId(addItemDto.itemId),
        quantity: addItemDto.quantity,
      });
    }

    cart.updatedAt = new Date();
    await cart.save();

    return this.getCartResponse(cart);
  }

  async updateItem(
    userId: string,
    itemId: string,
    updateItemDto: UpdateItemDto,
  ): Promise<CartResponseDto> {
    const cart = await this.getCart(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() === itemId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    if (updateItemDto.quantity !== undefined) {
      // Validate inventory
      const groceryItem = await this.groceryService.findOne(itemId);
      if (groceryItem.inventory < updateItemDto.quantity) {
        throw new BadRequestException('Not enough inventory');
      }

      cart.items[itemIndex].quantity = updateItemDto.quantity;
    }

    cart.updatedAt = new Date();
    await cart.save();

    return this.getCartResponse(cart);
  }

  async removeItem(userId: string, itemId: string): Promise<CartResponseDto> {
    const cart = await this.getCart(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.itemId.toString() === itemId,
    );

    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items.splice(itemIndex, 1);
    cart.updatedAt = new Date();
    await cart.save();

    return this.getCartResponse(cart);
  }

  async getCartDetails(userId: string): Promise<CartResponseDto> {
    const cart = await this.getCart(userId);
    if (!cart) {
      return {
        items: [],
        total: 0,
        updatedAt: new Date(),
      };
    }

    return this.getCartResponse(cart);
  }

  private async getCartResponse(cart: Cart): Promise<CartResponseDto> {
    const cartItems: CartItemResponseDto[] = [];
    let total = 0;

    for (const cartItem of cart.items) {
      const groceryItem = await this.groceryService.findOne(
        cartItem.itemId.toString(),
      );
      const itemTotal = groceryItem.price * cartItem.quantity;
      total += itemTotal;

      cartItems.push({
        item: groceryItem,
        quantity: cartItem.quantity,
      });
    }

    return {
      items: cartItems,
      total,
      updatedAt: cart.updatedAt,
    };
  }
}
