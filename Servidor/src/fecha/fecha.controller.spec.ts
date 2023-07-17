import { Test, TestingModule } from '@nestjs/testing';
import { FechaController } from './fecha.controller';
import { FechaService } from './fecha.service';

describe('FechaController', () => {
  let controller: FechaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FechaController],
      providers: [FechaService],
    }).compile();

    controller = module.get<FechaController>(FechaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
