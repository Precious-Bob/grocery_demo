import { Module } from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { GroceryController } from './grocery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grocery, grocerySchema } from './schemas/grocery.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Grocery.name, schema: grocerySchema }]),
  ],
  controllers: [GroceryController],
  providers: [GroceryService],
  exports: [GroceryService],
})
export class GroceryModule {}
