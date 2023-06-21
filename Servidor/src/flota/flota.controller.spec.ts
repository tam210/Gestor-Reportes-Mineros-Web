import { Test, TestingModule } from '@nestjs/testing';
import { FlotaController } from './flota.controller';
import { FlotaService } from './flota.service';

describe('FlotaController', () => {
  let controller: FlotaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlotaController],
      providers: [FlotaService],
    }).compile();

    controller = module.get<FlotaController>(FlotaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
