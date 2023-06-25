import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { SolicitudService } from 'src/solicitud/solicitud.service';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectModel(Usuario) private usuarioModel: typeof Usuario,
    private solicitudService: SolicitudService
  ){}

  async create(createUsuarioDto: CreateUsuarioDto) {
    console.log('createUsuarioDto')
    const usuario = await this.usuarioModel.create({
      nombre: createUsuarioDto.nombre,
      apellido: createUsuarioDto.apellido,
      correo: createUsuarioDto.correo,
      pass: createUsuarioDto.pass,
      tipousuario: createUsuarioDto.tipousuario
    });
    const solicitud = await this.solicitudService.createSolicitud({correo: createUsuarioDto.correo})
  }

  async findAll() {
    console.log('find all')
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

  async findAllWithPassword() {
    console.log('find all p')
    return await this.usuarioModel.findAll({ 
      attributes: { 
        include: [
          [
            this.usuarioModel.sequelize.literal("CASE WHEN tipousuario = 0 THEN 'admin' WHEN tipousuario = 1 THEN 'usuario' WHEN tipousuario = 2 THEN 'pendiente' END"),'tipousuario', //Convierte el numero del tipo usuario a texto para mostrar
          ]
        ]
      } 
    } );
  }

  async findOne(id: string) {
    console.log('find one')
    const usuario = await this.usuarioModel.findOne({
      where: {
        id: id
      }
    });
    return usuario;
  }
  
  async findOneCorreo(correo: string) {
    console.log('find one c')
    const usuario = await this.usuarioModel.findOne({
      where: {
        correo: correo
      }
    });
    return usuario;
  }
  

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    console.log('update')
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    console.log('remove')
    return `This action removes a #${id} usuario`;
  }
}
