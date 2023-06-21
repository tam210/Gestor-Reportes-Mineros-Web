import { Test, TestingModule } from '@nestjs/testing';
import { RajoService } from './rajo.service';

describe('RajoService', () => {
  let service: RajoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RajoService],
    }).compile();

    service = module.get<RajoService>(RajoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
