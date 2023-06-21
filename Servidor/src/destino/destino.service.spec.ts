import { Test, TestingModule } from '@nestjs/testing';
import { DestinoService } from './destino.service';

describe('DestinoService', () => {
  let service: DestinoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DestinoService],
    }).compile();

    service = module.get<DestinoService>(DestinoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
