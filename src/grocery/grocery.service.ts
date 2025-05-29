import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grocery } from './schemas/grocery.schema';
import {
  CreateGroceryDto,
  UpdateGroceryDto,
  GroceryResponseDto,
} from 'src/dto';

@Injectable()
export class GroceryService {
  constructor(
    @InjectModel(Grocery.name)
    private GroceryModel: Model<Grocery>,
  ) {}

  private toResponseDto(item: Grocery): GroceryResponseDto {
    return {
      id: item._id.toString(),
      name: item.name,
      price: item.price,
      inventory: item.inventory,
      category: item.category,
    };
  }

  async create(dto: CreateGroceryDto): Promise<GroceryResponseDto> {
    try {
      const createdItem = new this.GroceryModel(dto);
      const savedItem = await createdItem.save();
      return this.toResponseDto(savedItem);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<GroceryResponseDto[]> {
    const items = await this.GroceryModel.find().exec();
    return items.map(this.toResponseDto);
  }

  async findOne(id: string): Promise<GroceryResponseDto> {
    const item = await this.GroceryModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException('Grocery item not found');
    }
    return this.toResponseDto(item);
  }

  async update(id: string, dto: UpdateGroceryDto): Promise<GroceryResponseDto> {
    try {
      const updatedItem = await this.GroceryModel.findByIdAndUpdate(id, dto, {
        new: true,
      }).exec();
      if (!updatedItem) {
        throw new NotFoundException('Grocery item not found');
      }
      return this.toResponseDto(updatedItem);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.GroceryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Grocery item not found');
    }
    return { message: 'Grocery item deleted successfully' };
  }
}
