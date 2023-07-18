import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { ViajeController } from './viaje.controller';
import { Viaje } from './entities/viaje.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Camion } from 'src/camion/entities/camion.entity';
import { CamionService } from 'src/camion/camion.service';
import { Zona } from 'src/zona/entities/zona.entity';
import { Fecha } from 'src/fecha/entities/fecha.entity';
import { Origen } from 'src/origen/entities/origen.entity';
import { createGunzip } from 'zlib';
import { Carguio } from 'src/carguio/entities/carguio.entity';
import { Flota } from 'src/flota/entities/flota.entity';

@Module({
  imports: [SequelizeModule.forFeature([Viaje, Camion, Zona, Fecha, Origen, Carguio, Flota]),
            ],
  controllers: [ViajeController],
  providers: [ViajeService],
  exports: [ViajeService]

})
export class ViajeModule {}
