import { Document } from 'mongoose';

export interface IGrocery extends Document {
  name: string;
  price: number;
  inventory: number;
  category: string;
}
