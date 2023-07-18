import { Module } from '@nestjs/common';
import { OrigenService } from './origen.service';
import { OrigenController } from './origen.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Origen } from './entities/origen.entity';

@Module({
  imports: [SequelizeModule.forFeature([Origen])],
  controllers: [OrigenController],
  providers: [OrigenService],
  exports: [OrigenService]
})
export class OrigenModule {}
