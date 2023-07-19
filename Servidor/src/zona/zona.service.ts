import { Injectable } from '@nestjs/common';
import { CreateZonaDto } from './dto/create-zona.dto';
import { UpdateZonaDto } from './dto/update-zona.dto';
import { Zona } from './entities/zona.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class ZonaService {

  constructor(
    @InjectModel(Zona)
    private zonaModel: typeof Zona
  ){

  }
  create(createZonaDto: CreateZonaDto) {
    return 'This action adds a new zona';
  }

  async findAll() {
    console.log('find all')
    return await this.zonaModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} zona`;
  }

  update(id: number, updateZonaDto: UpdateZonaDto) {
    return `This action updates a #${id} zona`;
  }

  remove(id: number) {
    return `This action removes a #${id} zona`;
  }
}
