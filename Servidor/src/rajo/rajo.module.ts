import { Module } from '@nestjs/common';
import { RajoService } from './rajo.service';
import { RajoController } from './rajo.controller';

@Module({
  controllers: [RajoController],
  providers: [RajoService]
})
export class RajoModule {}
