import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { ViajeController } from './viaje.controller';
import { Viaje } from './entities/viaje.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Camion } from 'src/camion/entities/camion.entity';
import { CamionService } from 'src/camion/camion.service';

@Module({
  imports: [SequelizeModule.forFeature([Viaje, Camion]),
    
            ],
  controllers: [ViajeController],
  providers: [ViajeService],
  exports: [ViajeService]

})
export class ViajeModule {}
