import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsuarioModel } from './usuario.model';

@Module({
  imports: [SequelizeModule.forFeature([UsuarioModel])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}
