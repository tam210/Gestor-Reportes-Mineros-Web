import { Injectable } from '@nestjs/common';
import { CreateFlotaDto } from './dto/create-flota.dto';
import { UpdateFlotaDto } from './dto/update-flota.dto';
import { Flota } from './entities/flota.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FlotaService {

  constructor(
    @InjectModel(Flota)
    private flotaModel: typeof Flota
  ){}

  create(createFlotaDto: CreateFlotaDto) {
    return 'This action adds a new flota';
  }

  findAll() {
    return `This action returns all flota`;
  }

  async findOne(id: number) {
    console.log('Encontrar por id')
    const origen = await this.flotaModel.findOne({
      where: {
        id: id
      }
    });
    return origen;
  }
  update(id: number, updateFlotaDto: UpdateFlotaDto) {
    return `This action updates a #${id} flota`;
  }

  remove(id: number) {
    return `This action removes a #${id} flota`;
  }
}
