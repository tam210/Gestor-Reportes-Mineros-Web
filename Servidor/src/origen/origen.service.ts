import { Injectable } from '@nestjs/common';
import { CreateOrigenDto } from './dto/create-origen.dto';
import { UpdateOrigenDto } from './dto/update-origen.dto';

@Injectable()
export class OrigenService {
  create(createOrigenDto: CreateOrigenDto) {
    return 'This action adds a new origen';
  }

  findAll() {
    return `This action returns all origen`;
  }

  findOne(id: number) {
    return `This action returns a #${id} origen`;
  }

  update(id: number, updateOrigenDto: UpdateOrigenDto) {
    return `This action updates a #${id} origen`;
  }

  remove(id: number) {
    return `This action removes a #${id} origen`;
  }
}
