import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reporte } from './entities/reporte.entity';
import { Op } from 'sequelize';

@Injectable()
export class ReporteService {
  constructor(
    @InjectModel(Reporte) private readonly reporteModel: typeof Reporte,
  ){}

  create(createReporteDto: CreateReporteDto) {
    return 'This action adds a new reporte';
  }

  //Obtiene por el nombre del rajo y fecha
  async obtenerPorNombreRajoFecha2(rajonombre?: string, fechaInicio?: Date, fechaFin?: Date): Promise<Reporte[]> {
    //si no tiene nombre retorno todos
    if (!rajonombre && !fechaInicio) {
      rajonombre = 'ValorPredeterminado';
    }

    //si no tiene fecha d fin, es la actual
    if (!fechaFin) {
      fechaFin = new Date();
    }

    const reportes: Reporte[] = await this.reporteModel.findAll({
      where: {
        rajonombre,
        fecha: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
      attributes: ['rajonombre', 'fecha', 'idfecha', 'rajoreal', 'esperadokpi'],
    });

    return reportes;
  }



  async obtenerPorNombreRajoFecha(nombreRajo?: string, fechaInicio?: Date, fechaFin?: Date): Promise<Reporte[]> {
    let whereClause = {};
    let rajonombre = nombreRajo
    if (rajonombre) {
      whereClause = { ...whereClause, rajonombre };
    }

    if (fechaInicio && fechaFin) {
      whereClause = {
        ...whereClause,
        fecha: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      };
    } else if (fechaInicio) {
      whereClause = {
        ...whereClause,
        fecha: {
          [Op.gte]: fechaInicio,
        },
      };
    } else if (fechaFin) {
      whereClause = {
        ...whereClause,
        fecha: {
          [Op.lte]: fechaFin,
        },
      };
    }

    const reportes: Reporte[] = await Reporte.findAll({
      where: whereClause,
      attributes: ['rajonombre', 'fecha', 'idfecha', 'rajoreal', 'esperadokpi'],

    });

    return reportes;
  }












  //Obtiene todos
  async findAll(): Promise<Reporte[]> {
    return this.reporteModel.findAll({
      attributes: ['rajonombre', 'fecha', 'idfecha', 'rajoreal', 'esperadokpi'],
    });
  }

  //Obtiene por nombre del rajo. Eliminar si es lo mismo q arriba
  async obtenerPorRajoNombre(rajonombre: string): Promise<Reporte[]> {
    return this.reporteModel.findAll({
      where: { rajonombre },
      attributes: ['rajonombre', 'fecha', 'idfecha', 'rajoreal', 'esperadokpi'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} reporte`;
  }

  update(id: number, updateReporteDto: UpdateReporteDto) {
    return `This action updates a #${id} reporte`;
  }

  remove(id: number) {
    return `This action removes a #${id} reporte`;
  }
}
