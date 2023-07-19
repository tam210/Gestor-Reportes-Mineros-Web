import { Module } from '@nestjs/common';
import { FechaService } from './fecha.service';
import { FechaController } from './fecha.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Fecha } from './entities/fecha.entity';

@Module({
  imports: [SequelizeModule.forFeature([Fecha])],
  controllers: [FechaController],
  providers: [FechaService],
  exports: [FechaService]
   
})
export class FechaModule {}
