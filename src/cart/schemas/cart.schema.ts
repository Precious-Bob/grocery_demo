import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Cart extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop([
    {
      itemId: { type: Types.ObjectId, ref: 'GroceryItem', required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ])
  items: { itemId: Types.ObjectId; quantity: number }[];

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
