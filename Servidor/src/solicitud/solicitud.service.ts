import { Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Solicitud } from './entities/solicitud.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class SolicitudService {
  sequelize: any;
  constructor(
    @InjectModel(Solicitud)
    private solicitudModel: typeof Solicitud,
  ) {}

  // async createSolicitud(createSolicitudDto: CreateSolicitudDto, transaction: any) {
  //   const { idusuario, fecha } = createSolicitudDto;
  //   const id = await this.solicitudModel.count({ transaction });
  
  //   return this.solicitudModel.create(
  //     { idsolicitud: id + 1, idusuario, fecha },
  //     { transaction }
  //   );
  // }

  async createSolicitud(createSolicitudDto: CreateSolicitudDto): Promise<Solicitud> {
    const t = await this.sequelize.transaction();
    try {
      const nuevaSolicitud = await Solicitud.create(createSolicitudDto, { transaction: t });
      await t.commit();
      return nuevaSolicitud;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }


  async findAll(){
    console.log("Entrandoo a función")
    let solicitudes = await this.solicitudModel.findAll({
      include: [Usuario], // Incluir la entidad Usuario
    });

    solicitudes = solicitudes.filter(solicitud=>{
      const usuario = solicitud.usuario
      return usuario.estado ===1
    })

    return solicitudes.map(solicitud=>{
      const usuario = solicitud.usuario
      const tipousuario = usuario.tipousuario === 0 ? 'Administrador' : 'Usuario'
      return{
        ...solicitud.toJSON(),
        usuario:{
          ...usuario.toJSON(),
          tipousuario:tipousuario
        }
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitud`;
  }

  update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    return `This action updates a #${id} solicitud`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitud`;
  }
}
