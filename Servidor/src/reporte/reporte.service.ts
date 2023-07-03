import { Injectable } from '@nestjs/common';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reporte } from './entities/reporte.entity';

@Injectable()
export class ReporteService {
  constructor(
    @InjectModel(Reporte) private reporteModel: typeof Reporte,
  ){}

  create(createReporteDto: CreateReporteDto) {
    return 'This action adds a new reporte';
  }

  async findAll() {
    console.log("Obteniendo reporte")
    return await this.reporteModel.findAll();
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
