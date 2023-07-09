import { Controller, Get, Put, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AprobarRechazarUsuarioDto } from './dto/aprobar-rechazar-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  // Recibe desde el body un 'objeto' 
  // con los parametros a pasar para crear en userDTO
    async create(@Body() createUsuarioDto: CreateUsuarioDto) {
      console.log(createUsuarioDto)
    return await this.usuarioService.crearUsuarioYSolicitud(createUsuarioDto);
  }

  @Patch('solicitudes')
  async aprobarUsuario(@Body() aprobarRechazarUsuarioDto: AprobarRechazarUsuarioDto) {
    return this.usuarioService.decidirUsuario(aprobarRechazarUsuarioDto);
  }


  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch()
  update(
    @Body() userData: UpdateUsuarioDto
  ) {
    return this.usuarioService.actualizarUsuario(userData);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

}
