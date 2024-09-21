import { Test, TestingModule } from '@nestjs/testing';
import { EnvsService } from './envs.service';

describe('EnvsService', () => {
  let service: EnvsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvsService],
    }).compile();

    service = module.get<EnvsService>(EnvsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
