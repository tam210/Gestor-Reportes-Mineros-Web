import { Test, TestingModule } from '@nestjs/testing';
import { RajoController } from './rajo.controller';
import { RajoService } from './rajo.service';

describe('RajoController', () => {
  let controller: RajoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RajoController],
      providers: [RajoService],
    }).compile();

    controller = module.get<RajoController>(RajoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
