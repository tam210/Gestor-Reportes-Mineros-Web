import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { UsuarioModel } from './usuario.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([UsuarioModel])],
  controllers: [UsuarioController],
  providers: [UsuarioService]
})
export class UsuarioModule {}