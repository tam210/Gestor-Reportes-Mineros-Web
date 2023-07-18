import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { ViajeController } from './viaje.controller';
import { Viaje } from './entities/viaje.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Camion } from 'src/camion/entities/camion.entity';
import { CamionService } from 'src/camion/camion.service';
import { Zona } from 'src/zona/entities/zona.entity';
import { Fecha } from 'src/fecha/entities/fecha.entity';

@Module({
  imports: [SequelizeModule.forFeature([Viaje, Camion, Zona, Fecha]),
    
            ],
  controllers: [ViajeController],
  providers: [ViajeService],
  exports: [ViajeService]

})
export class ViajeModule {}
