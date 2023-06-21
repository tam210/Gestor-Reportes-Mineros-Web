import { Module } from '@nestjs/common';
import { CamionService } from './camion.service';
import { CamionController } from './camion.controller';

@Module({
  controllers: [CamionController],
  providers: [CamionService]
})
export class CamionModule {}
