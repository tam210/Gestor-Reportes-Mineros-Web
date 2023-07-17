import { Controller, Get, Put, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AprobarRechazarUsuarioDto } from './dto/aprobar-rechazar-usuario.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { RolUsuario, Roles } from 'src/roles/roles.decorator';


@Controller('usuario')

export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  // Recibe desde el body un 'objeto' 
  // con los parametros a pasar para crear en userDTO
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    console.log(createUsuarioDto)
    return await this.usuarioService.crearUsuarioYSolicitud(createUsuarioDto);
  }

  @Patch('solicitudes')
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  async aprobarUsuario(@Body() aprobarRechazarUsuarioDto: AprobarRechazarUsuarioDto) {
    return this.usuarioService.decidirUsuario(aprobarRechazarUsuarioDto);
  }

  @Get()
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  findAll() {
    console.log(1);
    
    return this.usuarioService.findAll();
  }

  @Get(':id')
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch()
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  update(
    @Body() userData: UpdateUsuarioDto
  ) {
    return this.usuarioService.actualizarUsuario(userData);
  }
  @Delete(':id')
  @Roles(RolUsuario.Administrador)
  @UseGuards(RolesGuard)
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

}
