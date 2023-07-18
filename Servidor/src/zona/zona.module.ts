import { Module } from '@nestjs/common';
import { ZonaService } from './zona.service';
import { ZonaController } from './zona.controller';
import { Zona } from './entities/zona.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Zona])],
  controllers: [ZonaController],
  providers: [ZonaService],
  exports: [ZonaService]
})
export class ZonaModule {}
