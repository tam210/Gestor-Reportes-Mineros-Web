import { Injectable } from '@nestjs/common';
import { CreateCarguioDto } from './dto/create-carguio.dto';
import { UpdateCarguioDto } from './dto/update-carguio.dto';

@Injectable()
export class CarguioService {
  create(createCarguioDto: CreateCarguioDto) {
    return 'This action adds a new carguio';
  }

  findAll() {
    return `This action returns all carguio`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carguio`;
  }

  update(id: number, updateCarguioDto: UpdateCarguioDto) {
    return `This action updates a #${id} carguio`;
  }

  remove(id: number) {
    return `This action removes a #${id} carguio`;
  }
}
