import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reporte } from './entities/reporte.entity';

@Injectable()
export class ReporteService {
  constructor(
    @InjectModel(Reporte) private readonly reporteModel: typeof Reporte,
  ){}

  create(createReporteDto: CreateReporteDto) {
    return 'This action adds a new reporte';
  }

  async findAll(): Promise<Reporte[]> {
    return this.reporteModel.findAll({
      attributes: ['rajonombre', 'fecha', 'idfecha', 'rajoreal', 'esperadokpi'],
    });
  }

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
