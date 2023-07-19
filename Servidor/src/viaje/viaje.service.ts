import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Viaje } from './entities/viaje.entity';
import { Camion } from '../camion/entities/camion.entity';
import { Fecha } from '../fecha/entities/fecha.entity';
import { Op, Sequelize } from 'sequelize';
import sequelize from 'sequelize';
import { Zona } from 'src/zona/entities/zona.entity';
import { Origen } from 'src/origen/entities/origen.entity';
import { Flota } from 'src/flota/entities/flota.entity';

@Injectable()
export class ViajeService {

  constructor(
    @InjectModel(Viaje)
    private viajeModel: typeof Viaje,
    @InjectModel(Origen)
    private origenModel: typeof Origen,
    @InjectModel(Camion)
    private camionModel: typeof Camion,
    @InjectModel(Zona)
    private zonaModel: typeof Zona,    
    @InjectModel(Flota)
    private flotaModel: typeof Flota,
    @InjectModel(Fecha)
    private fechaModel: typeof Fecha,  // inyectamos el modelo Fecha
  ) {}

  create(createViajeDto: CreateViajeDto) {
    // Lógica para crear un nuevo viaje utilizando los datos de createViajeDto
  }


  findAll() {
    return `This action returns all viaje`;
  }

  async findOne(id: number) {
    console.log('Encontrar por id')
    const viaje = await this.viajeModel.findOne({
      where: {
        id: id
      }
    });
    return viaje;
  }

  update(id: number, updateViajeDto: UpdateViajeDto) {
    return `This action updates a #${id} viaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} viaje`;
  }


  
async updateLoadFactor(updateViajeDto: UpdateViajeDto) {
  const fechaInicio = updateViajeDto.fechaInicio;
  const fechaFin = updateViajeDto.fechaFin;
  const idZona = updateViajeDto.idzona;
  const idFlota = updateViajeDto.idflota;

  console.log("entrando...");

  const t = await this.viajeModel.sequelize.transaction();
  try {
    const viajesToUpdate = await this.viajeModel.findAll({
      where: {
        idorigen: {
          [Op.in]: Sequelize.literal(`(SELECT idorigen FROM origen WHERE idzona = ${idZona})`)
        },
        idfecha: {
          [Op.in]: Sequelize.literal(`(SELECT idfecha FROM fecha WHERE fecha BETWEEN '${fechaInicio}' AND '${fechaFin}')`)
        },
        idcamion: {
          [Op.in]: Sequelize.literal(`(SELECT idcamion FROM camion WHERE idflota IN (SELECT idflota FROM flota WHERE idflota = ${idFlota}))`)
        },
      },
      transaction: t,
    });

    if (viajesToUpdate.length === 0) {
      throw new NotFoundException('No se encontraron viajes con los filtros especificados.');
    }

    const idsViajes = viajesToUpdate.map((viaje) => viaje.getDataValue('idviaje'));
    console.log("---------VIAJES---------");
    console.log(idsViajes);
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
