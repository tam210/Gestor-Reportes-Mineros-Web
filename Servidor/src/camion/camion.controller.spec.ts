import { Test, TestingModule } from '@nestjs/testing';
import { CamionController } from './camion.controller';
import { CamionService } from './camion.service';

describe('CamionController', () => {
  let controller: CamionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamionController],
      providers: [CamionService],
    }).compile();

    controller = module.get<CamionController>(CamionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
