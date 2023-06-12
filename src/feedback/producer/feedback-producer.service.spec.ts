import { Test, TestingModule } from '@nestjs/testing';
import { FeedbackProducerService } from './feedback-producer.service';

describe('FeedbackProducerService', () => {
  let service: FeedbackProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FeedbackProducerService],
    }).compile();

    service = module.get<FeedbackProducerService>(FeedbackProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
