import { Test, TestingModule } from '@nestjs/testing';
import { SalesConsumerService } from './sales-consumer.service';

describe('SalesConsumerService', () => {
  let service: SalesConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesConsumerService],
    }).compile();

    service = module.get<SalesConsumerService>(SalesConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
