import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { GroceryModule } from 'src/grocery/grocery.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    GroceryModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
