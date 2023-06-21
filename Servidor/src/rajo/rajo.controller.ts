import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RajoService } from './rajo.service';
import { CreateRajoDto } from './dto/create-rajo.dto';
import { UpdateRajoDto } from './dto/update-rajo.dto';

@Controller('rajo')
export class RajoController {
  constructor(private readonly rajoService: RajoService) {}

  @Post()
  create(@Body() createRajoDto: CreateRajoDto) {
    return this.rajoService.create(createRajoDto);
  }

  @Get()
  findAll() {
    return this.rajoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rajoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRajoDto: UpdateRajoDto) {
    return this.rajoService.update(+id, updateRajoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rajoService.remove(+id);
  }
}
