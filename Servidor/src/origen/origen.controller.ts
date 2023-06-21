import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrigenService } from './origen.service';
import { CreateOrigenDto } from './dto/create-origen.dto';
import { UpdateOrigenDto } from './dto/update-origen.dto';

@Controller('origen')
export class OrigenController {
  constructor(private readonly origenService: OrigenService) {}

  @Post()
  create(@Body() createOrigenDto: CreateOrigenDto) {
    return this.origenService.create(createOrigenDto);
  }

  @Get()
  findAll() {
    return this.origenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.origenService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrigenDto: UpdateOrigenDto) {
    return this.origenService.update(+id, updateOrigenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.origenService.remove(+id);
  }
}
