import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarguioService } from './carguio.service';
import { CreateCarguioDto } from './dto/create-carguio.dto';
import { UpdateCarguioDto } from './dto/update-carguio.dto';

@Controller('carguio')
export class CarguioController {
  constructor(private readonly carguioService: CarguioService) {}

  @Post()
  create(@Body() createCarguioDto: CreateCarguioDto) {
    return this.carguioService.create(createCarguioDto);
  }

  @Get()
  findAll() {
    return this.carguioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carguioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarguioDto: UpdateCarguioDto) {
    return this.carguioService.update(+id, updateCarguioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carguioService.remove(+id);
  }
}
