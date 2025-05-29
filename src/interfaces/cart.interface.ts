import { Document, Types } from 'mongoose';

export interface ICartItem {
  itemId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  userId: Types.ObjectId;
  items: ICartItem[];
}
