import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioModel } from './usuario.model';
import { InjectModel} from '@nestjs/sequelize';

@Injectable()
export class UsuarioService {
  constructor (
    @InjectModel(UsuarioModel) private usuarioModel: typeof UsuarioModel
  ){}

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll() {
    const usuario = await this.usuarioModel.findAll();
    return{
      usuario: usuario
    }
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
