import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlotaService } from './flota.service';
import { CreateFlotaDto } from './dto/create-flota.dto';
import { UpdateFlotaDto } from './dto/update-flota.dto';

@Controller('flota')
export class FlotaController {
  constructor(private readonly flotaService: FlotaService) {}

  @Post()
  create(@Body() createFlotaDto: CreateFlotaDto) {
    return this.flotaService.create(createFlotaDto);
  }

  @Get()
  findAll() {
    return this.flotaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flotaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlotaDto: UpdateFlotaDto) {
    return this.flotaService.update(+id, updateFlotaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flotaService.remove(+id);
  }
}
