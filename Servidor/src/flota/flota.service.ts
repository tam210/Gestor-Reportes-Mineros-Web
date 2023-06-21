import { Injectable } from '@nestjs/common';
import { CreateFlotaDto } from './dto/create-flota.dto';
import { UpdateFlotaDto } from './dto/update-flota.dto';

@Injectable()
export class FlotaService {
  create(createFlotaDto: CreateFlotaDto) {
    return 'This action adds a new flota';
  }

  findAll() {
    return `This action returns all flota`;
  }

  findOne(id: number) {
    return `This action returns a #${id} flota`;
  }

  update(id: number, updateFlotaDto: UpdateFlotaDto) {
    return `This action updates a #${id} flota`;
  }

  remove(id: number) {
    return `This action removes a #${id} flota`;
  }
}
