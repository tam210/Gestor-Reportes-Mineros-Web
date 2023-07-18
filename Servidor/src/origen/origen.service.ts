import { Inject, Injectable } from '@nestjs/common';
import { CreateOrigenDto } from './dto/create-origen.dto';
import { UpdateOrigenDto } from './dto/update-origen.dto';
import { Origen } from './entities/origen.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrigenService {
  constructor(
    @InjectModel(Origen)
    private origenModel: typeof Origen
  ){

  }

  create(createOrigenDto: CreateOrigenDto) {
    return 'This action adds a new origen';
  }

  async findAll() {
    console.log('find all')
    return await this.origenModel.findAll();
  }

  async findOne(id: number) {
    console.log('Encontrar por id')
    const origen = await this.origenModel.findOne({
      where: {
        id: id
      }
    });
    return origen;
  }


  update(id: number, updateOrigenDto: UpdateOrigenDto) {
    return `This action updates a #${id} origen`;
  }

  remove(id: number) {
    return `This action removes a #${id} origen`;
  }
}
