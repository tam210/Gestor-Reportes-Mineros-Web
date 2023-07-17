import { Module } from '@nestjs/common';
import { FechaService } from './fecha.service';
import { FechaController } from './fecha.controller';

@Module({
  controllers: [FechaController],
  providers: [FechaService]
})
export class FechaModule {}
