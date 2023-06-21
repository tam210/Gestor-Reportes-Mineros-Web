import { Test, TestingModule } from '@nestjs/testing';
import { DestinoController } from './destino.controller';
import { DestinoService } from './destino.service';

describe('DestinoController', () => {
  let controller: DestinoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DestinoController],
      providers: [DestinoService],
    }).compile();

    controller = module.get<DestinoController>(DestinoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
