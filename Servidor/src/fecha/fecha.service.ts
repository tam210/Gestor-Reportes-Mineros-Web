import { Injectable } from '@nestjs/common';
import { CreateFechaDto } from './dto/create-fecha.dto';
import { UpdateFechaDto } from './dto/update-fecha.dto';
import { Fecha } from './entities/fecha.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FechaService {

  constructor(
    @InjectModel(Fecha)
    private fechaModel: typeof Fecha,
  ) {}


  create(createFechaDto: CreateFechaDto) {
    return 'This action adds a new fecha';
  }

  findAll() {
    return `This action returns all fecha`;
  }

  async findOne(id: number) {
    console.log('Encontrar por id')
    const viaje = await this.fechaModel.findOne({
      where: {
        id: id
      }
    });
    return viaje;
  }

  update(id: number, updateFechaDto: UpdateFechaDto) {
    return `This action updates a #${id} fecha`;
  }

  remove(id: number) {
    return `This action removes a #${id} fecha`;
  }
}
