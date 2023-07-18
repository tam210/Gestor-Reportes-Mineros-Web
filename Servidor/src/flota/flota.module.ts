import { Module } from '@nestjs/common';
import { FlotaService } from './flota.service';
import { FlotaController } from './flota.controller';
import { Flota } from './entities/flota.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Flota])],
  controllers: [FlotaController],
  providers: [FlotaService],
  exports: [FlotaService]
   
})
export class FlotaModule {}
