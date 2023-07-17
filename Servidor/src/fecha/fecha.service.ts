import { Injectable } from '@nestjs/common';
import { CreateFechaDto } from './dto/create-fecha.dto';
import { UpdateFechaDto } from './dto/update-fecha.dto';

@Injectable()
export class FechaService {
  create(createFechaDto: CreateFechaDto) {
    return 'This action adds a new fecha';
  }

  findAll() {
    return `This action returns all fecha`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fecha`;
  }

  update(id: number, updateFechaDto: UpdateFechaDto) {
    return `This action updates a #${id} fecha`;
  }

  remove(id: number) {
    return `This action removes a #${id} fecha`;
  }
}
