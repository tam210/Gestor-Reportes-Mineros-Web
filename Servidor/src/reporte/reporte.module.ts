import { Module } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reporte } from './entities/reporte.entity';

@Module({
  imports: [SequelizeModule.forFeature([Reporte])],
  controllers: [ReporteController],
  providers: [ReporteService],
  exports: [ReporteService]
})
export class ReporteModule {}
