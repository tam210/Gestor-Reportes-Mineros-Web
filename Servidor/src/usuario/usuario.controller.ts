import { Controller, Get, Put, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

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

  @Patch(':id/aprobar')
  async aprobarUsuario(@Param('id') id: string) {
    console.log("entrando")
    return this.usuarioService.aprobarUsuario(id);
  }

  @Patch(':id/rechazar')
  async rechazarUsuario(@Param('id') id: string){
    return this.usuarioService.rechazarUsuario(id);
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
  //   return this.usuarioService.update(+id, updateUsuarioDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

}
