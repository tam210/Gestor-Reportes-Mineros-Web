import { Test, TestingModule } from '@nestjs/testing';
import { CarguioController } from './carguio.controller';
import { CarguioService } from './carguio.service';

describe('CarguioController', () => {
  let controller: CarguioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarguioController],
      providers: [CarguioService],
    }).compile();

    controller = module.get<CarguioController>(CarguioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
