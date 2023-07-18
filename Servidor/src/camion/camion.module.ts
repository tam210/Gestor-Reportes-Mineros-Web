import { Module } from '@nestjs/common';
import { CamionService } from './camion.service';
import { CamionController } from './camion.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Camion } from './entities/camion.entity';

@Module({
  imports: [SequelizeModule.forFeature([Camion])],
  controllers: [CamionController],
  providers: [CamionService],
  exports: [CamionService]
    
})
export class CamionModule {}
