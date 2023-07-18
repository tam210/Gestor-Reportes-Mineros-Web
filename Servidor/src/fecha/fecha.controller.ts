import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FechaService } from './fecha.service';
import { CreateFechaDto } from './dto/create-fecha.dto';
import { UpdateFechaDto } from './dto/update-fecha.dto';

@Controller('fecha')
export class FechaController {
  constructor(private readonly fechaService: FechaService) {}

  @Post()
  create(@Body() createFechaDto: CreateFechaDto) {
    return this.fechaService.create(createFechaDto);
  }

  @Get()
  findAll() {
    return this.fechaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fechaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFechaDto: UpdateFechaDto) {
    return this.fechaService.update(+id, updateFechaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fechaService.remove(+id);
  }
}
