import { Module } from '@nestjs/common';
import { CarguioService } from './carguio.service';
import { CarguioController } from './carguio.controller';

@Module({
  controllers: [CarguioController],
  providers: [CarguioService]
})
export class CarguioModule {}
