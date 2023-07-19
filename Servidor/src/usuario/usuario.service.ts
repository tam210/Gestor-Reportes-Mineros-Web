import { Body, ConflictException, Injectable, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { SolicitudService } from 'src/solicitud/solicitud.service';
import { Solicitud } from 'src/solicitud/entities/solicitud.entity';
import { CreateSolicitudDto } from 'src/solicitud/dto/create-solicitud.dto';
import { AprobarRechazarUsuarioDto } from './dto/aprobar-rechazar-usuario.dto';
import { Op } from 'sequelize';


export enum EstadoUsuario {
  Rechazado = 0,
  Pendiente = 1,
  Aprobado = 2
}

@Injectable()
export class UsuarioService {
  sequelize: any;

  constructor(
    @InjectModel(Usuario) private usuarioModel: typeof Usuario,
    @InjectModel(Solicitud) private readonly solicitudModel: typeof Solicitud,
  ){}

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
      const nuevaSolicitud = await this.solicitudModel.create
      (solicitudData, { transaction: t });
      console.log('commit')
      await t.commit();
      return {
        usuario: nuevoUsuario,
        solicitud: nuevaSolicitud,
      };
    } catch (error) {
      await t.rollback();
      console.log(error)
      throw error;
    }
  }

  async decidirUsuario(usuarioData: AprobarRechazarUsuarioDto): Promise<Usuario> {
    const decision = usuarioData.decision
    const usuario = await this.usuarioModel.findByPk(usuarioData.id);
    console.log(usuarioData,decision)
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if(decision){ //aprobado = 1, rechazado = 0
      usuario.estado = EstadoUsuario.Aprobado;
    }else{
      usuario.estado = EstadoUsuario.Rechazado;      
    }
    return usuario.save();
  }


  async actualizarUsuario(updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    try {
      console.log("update")
      const usuarioExistente = await this.usuarioModel.findByPk(updateUsuarioDto.id);
      if (!usuarioExistente) {
        throw new NotFoundException('Usuario no encontrado');
      }
      
      const diccionario = {
        "Administrador":0,
        "Usuario":1,
        "Rechazado":0,
        "Pendiente":1,
        "Aprobado":2
      }
      console.log(updateUsuarioDto)
      updateUsuarioDto.tipousuario = diccionario[updateUsuarioDto.tipousuario]
      updateUsuarioDto.estado = diccionario[updateUsuarioDto.estado]
      if(updateUsuarioDto.estadoText!==undefined){
        const user ={
          "id":updateUsuarioDto.id,
          "estado":diccionario[updateUsuarioDto.estadoText]
        }
        await usuarioExistente.update(user)
        return usuarioExistente 
      }
      console.log('await')
      // Verificar si se está actualizando a un correo existente
      if (updateUsuarioDto.correo && updateUsuarioDto.correo !== usuarioExistente.correo) {
        const usuarioConMismoCorreo = await this.usuarioModel.findOne({
          where: { correo: updateUsuarioDto.correo },
        });
        if (usuarioConMismoCorreo) {
          throw new ConflictException('El correo proporcionado ya está en uso');
        }
      }
      
      await usuarioExistente.update(updateUsuarioDto);
  
      return usuarioExistente;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    console.log('find all')
    return await this.usuarioModel.findAll({ 
      attributes: { 
        exclude: ['pass'], 
        include: [
          [
            this.usuarioModel.sequelize.literal("CASE WHEN tipousuario = 0 THEN 'Administrador' WHEN tipousuario = 1 THEN 'Usuario' END"),'tipousuario', //Convierte el numero del tipo usuario a texto para mostrar
          ],
          [
            this.usuarioModel.sequelize.literal("CASE WHEN estado = 0 THEN 'Rechazado' WHEN estado = 1 THEN 'Pendiente' WHEN estado = 2 THEN 'Aprobado' END"),'estado'
          ]
        ]
      },
      where:{
        estado:{
          [Op.not]: 1 //Omite los usuarios con estado pendiente
        }
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
