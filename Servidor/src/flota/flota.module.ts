import { Module } from '@nestjs/common';
import { FlotaService } from './flota.service';
import { FlotaController } from './flota.controller';

@Module({
  controllers: [FlotaController],
  providers: [FlotaService]
})
export class FlotaModule {}
