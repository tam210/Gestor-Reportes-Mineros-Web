import { Module } from '@nestjs/common';
import { SolicitudService } from './solicitud.service';
import { SolicitudController } from './solicitud.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Solicitud } from './entities/solicitud.entity';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
  imports: [SequelizeModule.forFeature([Solicitud]),
    ],
  // Agrega el modelo "Solicitud" aquí
  controllers: [SolicitudController],
  providers: [SolicitudService],
  exports: [SolicitudService]
})
export class SolicitudModule { }
