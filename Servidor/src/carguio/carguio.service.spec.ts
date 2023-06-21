import { Test, TestingModule } from '@nestjs/testing';
import { CarguioService } from './carguio.service';

describe('CarguioService', () => {
  let service: CarguioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarguioService],
    }).compile();

    service = module.get<CarguioService>(CarguioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
