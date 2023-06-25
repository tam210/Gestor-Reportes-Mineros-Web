import { Injectable } from '@nestjs/common';
import { CreateSolicitudDto } from './dto/create-solicitud.dto';
import { UpdateSolicitudDto } from './dto/update-solicitud.dto';
import { Solicitud } from './entities/solicitud.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class SolicitudService {
  constructor(
    @InjectModel(Solicitud)
    private solicitudModel: typeof Solicitud,
  ) {}

  async createSolicitud(createSolicitudDto: CreateSolicitudDto){
    const { correo } = createSolicitudDto;
    const id = await this.solicitudModel.count();
    return this.solicitudModel.create({ idsolicitud:id+1,correo:correo });
  }

  async findAll() {
    return this.solicitudModel.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} solicitud`;
  }

  update(id: number, updateSolicitudDto: UpdateSolicitudDto) {
    return `This action updates a #${id} solicitud`;
  }

  remove(id: number) {
    return `This action removes a #${id} solicitud`;
  }
}
