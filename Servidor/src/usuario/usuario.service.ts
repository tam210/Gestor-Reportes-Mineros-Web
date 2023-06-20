import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UsuarioModel } from './usuario.model';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel(UsuarioModel) private usuarioModel: typeof UsuarioModel
  ){}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll() {
    return await this.usuarioModel.findAll({ 
      attributes: { 
        exclude: ['pass'], 
        include: [
          [
            this.usuarioModel.sequelize.literal("CASE WHEN tipousuario = 0 THEN 'admin' WHEN tipousuario = 1 THEN 'usuario' WHEN tipousuario = 2 THEN 'pendiente' END"),'tipousuario', //Convierte el numero del tipo usuario a texto para mostrar
          ]
        ]
      } 
    } );
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
