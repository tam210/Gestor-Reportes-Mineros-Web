import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CamionService } from './camion.service';
import { CreateCamionDto } from './dto/create-camion.dto';
import { UpdateCamionDto } from './dto/update-camion.dto';

@Controller('camion')
export class CamionController {
  constructor(private readonly camionService: CamionService) {}

  @Post()
  create(@Body() createCamionDto: CreateCamionDto) {
    return this.camionService.create(createCamionDto);
  }

  @Get()
  findAll() {
    return this.camionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.camionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCamionDto: UpdateCamionDto) {
    return this.camionService.update(+id, updateCamionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.camionService.remove(+id);
  }
}
