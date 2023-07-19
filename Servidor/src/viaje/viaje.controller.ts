import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { RolUsuario, Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('viaje')
export class ViajeController {
  constructor(private readonly viajeService: ViajeService) {}

  @Post()
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  create(@Body() createViajeDto: CreateViajeDto) {
    return this.viajeService.create(createViajeDto);
  }

  @Get()
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  findAll() {
    return this.viajeService.findAll();
  }

  @Get(':id')
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.viajeService.findOne(+id);
  }

  @Patch()
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  update(@Body() updateViajeDto: UpdateViajeDto) {
    return this.viajeService.updateLoadFactor(updateViajeDto);
  }

  @Delete(':id')
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.viajeService.remove(+id);
  }
}
