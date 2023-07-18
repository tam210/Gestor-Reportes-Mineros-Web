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
  

  async updateLoadFactor2(updateViajeDto: UpdateViajeDto) {
    const fechaInicio = updateViajeDto.fechaInicio;
    const fechaFin = updateViajeDto.fechaFin;
    const idZona = updateViajeDto.idzona;
    const idFlota = updateViajeDto.idflota;
  
    console.log("entrando...");
  
    const t = await this.viajeModel.sequelize.transaction();
    try {
      // Encontrar los IDs de viajes que coincidan con las fechas, zona y flota
      const viajesToUpdate = await this.viajeModel.findAll({
        include: [
          {
            model: this.origenModel,
            include: [{
              model: this.zonaModel,
              where: {
                idzona: idZona
              }
            }],
          },
          {
            model: this.fechaModel,
            where: {
              fecha: {
                [Op.between]: [fechaInicio, fechaFin]
              },
            },
          },
          {
            model: this.camionModel,
            include: [{
              model: this.flotaModel,
              where: {
                idflota: idFlota
              }
            }],
          }
        ],
        transaction: t,
      });
  
      if (viajesToUpdate.length === 0) {
        throw new NotFoundException('No se encontraron viajes con los filtros especificados.');
      }
  
      const idsViajes = viajesToUpdate.map((viaje) => viaje.getDataValue('idviaje'));
      console.log("---------VIAJES---------");
      console.log(idsViajes.length);
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
  
  

    async updateLoadFactor_ofiicial(updateViajeDto: UpdateViajeDto) {
      const fechaInicio = updateViajeDto.fechaInicio;
      const fechaFin = updateViajeDto.fechaFin;
      
      const origen = updateViajeDto.idorigen;
      const idFlota = updateViajeDto.idflota;
      const idZona = updateViajeDto.idzona;
      console.log("entrando...");
  
      const t = await this.viajeModel.sequelize.transaction();
      try {
        // Encontrar los IDs de camiones en la flota especificada
        const camionesEnFlota = await this.camionModel.findAll({
          attributes: ['idcamion'],
          where: {
            idflota: idFlota,
          },
          transaction: t,
        });
        if (camionesEnFlota.length === 0) {
          throw new NotFoundException('No se encontraron camiones en la flota especificada.');
        }
  
        const idsCamiones = camionesEnFlota.map((camion) => camion.getDataValue('idcamion'));
        console.log("---------FLOTAS---------");
        console.log(idsCamiones);
  
        // Encontrar los IDs de las fechas que estén dentro del rango especificado
        const fechas = await this.fechaModel.findAll({
          attributes: ['idfecha'],
          where: {
            fecha: {
              [Op.between]: [fechaInicio, fechaFin]
            },
          },
          transaction: t,
        });

        if (fechas.length === 0) {
          throw new NotFoundException('No se encontraron fechas en el rango especificado.');
        }
  
        const idsFechas = fechas.map((fecha) => fecha.getDataValue('idfecha'));
        console.log("--------FECHAS----------");
        console.log(idsFechas);
        // Encontrar los IDs de viajes que coincidan con las fechas, origen, zona y camiones en la flota
        const viajesEnCamiones = await this.viajeModel.findAll({
          attributes: ['idviaje'],
          where: {
            idfecha: idsFechas,
            idorigen: origen,
            idcamion: idsCamiones,
            //idzona: idZona,
          },
          transaction: t,
        });
  
        if (viajesEnCamiones.length === 0) {
          throw new NotFoundException('No se encontraron viajes con los filtros especificados.');
        }
  
        const idsViajes = viajesEnCamiones.map((viaje) => viaje.getDataValue('idviaje'));
        console.log("---------VIAJESS---------");
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
  
  
  // async updateLoadFactor_respaldo(updateViajeDto: UpdateViajeDto) {
  //   const fechaInicio = updateViajeDto.fechaInicio;
  //   const fechaFin = updateViajeDto.fechaFin;
  //   const origen = updateViajeDto.idorigen;
  //   const idFlota = updateViajeDto.idflota;
  //   console.log("entrando...");
    
  //   //const tonelaje = updateViajeDto.tonelaje;
  //   const t = await this.viajeModel.sequelize.transaction();
  //   try {
  //     // Encontrar los IDs de camiones en la flota especificada
  //     const camionesEnFlota = await this.camionModel.findAll({
  //       attributes: ['idcamion'],
  //       where: {
  //         idflota: idFlota,
  //       },
  //       transaction: t,
  //     });

  //     if (camionesEnFlota.length === 0) {
  //       throw new NotFoundException('No se encontraron camiones en la flota especificada.');
  //     }

  //     const idsCamiones = camionesEnFlota.map((camion) => camion.getDataValue('idcamion'));

  //     // Encontrar los IDs de viajes que coincidan con la fecha, origen y camiones en la flota
  //     const viajesEnCamiones = await this.viajeModel.findAll({
  //       attributes: ['idviaje'],
  //       where: {
  //         //dentro de la fecha
  //         fecha: {
  //           [this.sequelize.Op.between]: [fechaInicio, fechaFin]
  //         },
  //         //idfecha: fecha,
  //         idorigen: origen,
  //         idcamion: idsCamiones,
  //       },
  //       transaction: t,
  //     });

  //     if (viajesEnCamiones.length === 0) {
  //       throw new NotFoundException('No se encontraron viajes con los filtros especificados.');
  //     }

  //     const idsViajes = viajesEnCamiones.map((viaje) => viaje.getDataValue('idviaje'));

  //     // Actualizar el tonelaje de los viajes encontrados
  //     await this.viajeModel.update(
  //       {
  //         tonelaje: updateViajeDto.tonelaje,
  //       },
  //       {
  //         where: {
  //           idviaje: idsViajes,
  //         },
  //         transaction: t,
  //       },
  //     );

  //     await t.commit();
  //     return { message: 'Tonelaje actualizado exitosamente.' };
  //   } catch (error) {
  //     await t.rollback();
  //     throw error;
  //   }
  // }

}
