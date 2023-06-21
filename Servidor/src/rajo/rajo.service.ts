import { Injectable } from '@nestjs/common';
import { CreateRajoDto } from './dto/create-rajo.dto';
import { UpdateRajoDto } from './dto/update-rajo.dto';

@Injectable()
export class RajoService {
  create(createRajoDto: CreateRajoDto) {
    return 'This action adds a new rajo';
  }

  findAll() {
    return `This action returns all rajo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rajo`;
  }

  update(id: number, updateRajoDto: UpdateRajoDto) {
    return `This action updates a #${id} rajo`;
  }

  remove(id: number) {
    return `This action removes a #${id} rajo`;
  }
}
