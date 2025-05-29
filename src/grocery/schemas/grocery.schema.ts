import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Grocery extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  inventory: number;

  @Prop({ required: true })
  category: string;
}

export const grocerySchema = SchemaFactory.createForClass(Grocery);
