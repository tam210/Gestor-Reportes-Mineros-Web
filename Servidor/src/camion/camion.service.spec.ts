import { Test, TestingModule } from '@nestjs/testing';
import { CamionService } from './camion.service';

describe('CamionService', () => {
  let service: CamionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamionService],
    }).compile();

    service = module.get<CamionService>(CamionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
