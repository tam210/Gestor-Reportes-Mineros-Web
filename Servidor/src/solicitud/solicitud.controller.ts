import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { RolUsuario, Roles } from 'src/roles/roles.decorator';

@Controller('solicitud')

export class SolicitudController {
  constructor(private readonly solicitudService: SolicitudService) {}

  @Get()
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  findAll() {
    return this.solicitudService.findAll();
  }

  @Get(':id')
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.solicitudService.findOne(+id);
  }

  @Patch(':id')
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  update(@Param('id') id: string, @Body() updateSolicitudDto: UpdateSolicitudDto) {
    return this.solicitudService.update(+id, updateSolicitudDto);
  }

  @Delete(':id')
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) { 
    return this.solicitudService.remove(+id);
  }
}
