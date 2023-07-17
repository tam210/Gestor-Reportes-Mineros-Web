import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Viaje } from './entities/viaje.entity';
import { Camion } from '../camion/entities/camion.entity';
import { Fecha } from '../fecha/entities/fecha.entity';
import { Sequelize } from 'sequelize';



@Injectable()
export class ViajeService {
  constructor(
    @InjectModel(Viaje)
    private readonly viajeModel: typeof Viaje,
    @InjectModel(Camion)
    private readonly camionModel: typeof Camion,
    private sequelize: Sequelize,
  ) {}


  create(createViajeDto: CreateViajeDto) {
    // Lógica para crear un nuevo viaje utilizando los datos de createViajeDto
  }


  findAll() {
    return `This action returns all viaje`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viaje`;
  }

  update(id: number, updateViajeDto: UpdateViajeDto) {
    return `This action updates a #${id} viaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} viaje`;
  }

  async updateLoadFactor(fecha: string, origen: string, idFlota: number, updateViajeDto: UpdateViajeDto) {
    const t = await this.sequelize.transaction();
    try {
      // Encontrar los IDs de camiones en la flota especificada
      const camionesEnFlota = await this.camionModel.findAll({
        attributes: ['idcamion'],
        where: {
          flota: idFlota,
        },
        transaction: t,
      });

      if (camionesEnFlota.length === 0) {
        throw new NotFoundException('No se encontraron camiones en la flota especificada.');
      }

      const idsCamiones = camionesEnFlota.map((camion) => camion.getDataValue('idcamion'));

      // Encontrar los IDs de viajes que coincidan con la fecha, origen y camiones en la flota
      const viajesEnCamiones = await this.viajeModel.findAll({
        attributes: ['idviaje'],
        where: {
          idfecha: fecha,
          idorigen: origen,
          idcamion: idsCamiones,
        },
        transaction: t,
      });

      if (viajesEnCamiones.length === 0) {
        throw new NotFoundException('No se encontraron viajes con los filtros especificados.');
      }

      const idsViajes = viajesEnCamiones.map((viaje) => viaje.getDataValue('idviaje'));

      // Actualizar el tonelaje de los viajes encontrados
      await this.viajeModel.update(
        {
          tonelaje: updateViajeDto.tonelaje,
        },
        {
          where: {
            idviaje: idsViajes,
          },
          transaction: t,
        },
      );

      await t.commit();
      return { message: 'Tonelaje actualizado exitosamente.' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

}
