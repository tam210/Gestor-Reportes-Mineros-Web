import { Body, Injectable, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { SolicitudService } from 'src/solicitud/solicitud.service';
import { Solicitud } from 'src/solicitud/entities/solicitud.entity';
import { CreateSolicitudDto } from 'src/solicitud/dto/create-solicitud.dto';


enum EstadoUsuario {
  Rechazado = 0,
  Pendiente = 1,
  Aprobado = 2,
}


@Injectable()
export class UsuarioService {
  sequelize: any;

  constructor(
    @InjectModel(Usuario) private usuarioModel: typeof Usuario,
    @InjectModel(Solicitud) private readonly solicitudModel: typeof Solicitud,
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
    return usuario;
  }

  async crearUsuarioYSolicitud(usuarioData: CreateUsuarioDto): Promise<any> {
    const t = await this.usuarioModel.sequelize.transaction();
    try {
      // Crear usuario
      const nuevoUsuario = await this.usuarioModel.create(usuarioData, { transaction: t });
      console.log("NUEVO USUARIO")
      // Asignar ID del usuario a la solicitud
      const solicitudData = new CreateSolicitudDto();
      
      solicitudData.idusuario = nuevoUsuario.id;
      solicitudData.fecha = new Date();

      // Crear solicitud
      const nuevaSolicitud = await this.solicitudModel.create(solicitudData, { transaction: t });

      await t.commit();

      return {
        usuario: nuevoUsuario,
        solicitud: nuevaSolicitud,
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
  
  async aprobarUsuario(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findByPk(id);

    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    usuario.estado = EstadoUsuario.Aprobado;
    return usuario.save();
  }

  async rechazarUsuario(id: string): Promise<Usuario> {
    const usuario = await this.usuarioModel.findByPk(id);
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    usuario.estado = EstadoUsuario.Rechazado;
    return usuario.save();
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
