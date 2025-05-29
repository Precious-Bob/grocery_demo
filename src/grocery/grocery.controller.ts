import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { CreateGroceryDto, UpdateGroceryDto } from 'src/dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@Controller('grocery')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateGroceryDto) {
    return this.groceryService.create(dto);
  }

  @Get()
  findAll() {
    return this.groceryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groceryService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateGroceryDto) {
    return this.groceryService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.groceryService.remove(id);
  }
}
