import { Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Solicitud } from './entities/solicitud.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize';

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


  async findAll() {
    return this.solicitudModel.findAll();
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
