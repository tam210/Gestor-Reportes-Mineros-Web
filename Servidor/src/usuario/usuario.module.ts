import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { SolicitudModule } from 'src/solicitud/solicitud.module';
import { Solicitud } from 'src/solicitud/entities/solicitud.entity';

@Module({
  imports: [SequelizeModule.forFeature([Usuario, Solicitud]),
            SolicitudModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
  exports: [UsuarioService]
})
export class UsuarioModule {}
