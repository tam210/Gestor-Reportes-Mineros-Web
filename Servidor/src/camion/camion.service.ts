import { Injectable } from '@nestjs/common';
import { CreateCamionDto } from './dto/create-camion.dto';
import { UpdateCamionDto } from './dto/update-camion.dto';
import { Camion } from './entities/camion.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CamionService {

  sequelize: any;

  constructor(
    @InjectModel(Camion) 
    private camionModel: typeof Camion,
  ){}

  
  create(createCamionDto: CreateCamionDto) {
    return 'This action adds a new camion';
  }


  async findAll() {
    console.log('find all')
    return await this.camionModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} camion`;
  }

  update(id: number, updateCamionDto: UpdateCamionDto) {
    return `This action updates a #${id} camion`;
  }

  remove(id: number) {
    return `This action removes a #${id} camion`;
  }
}
