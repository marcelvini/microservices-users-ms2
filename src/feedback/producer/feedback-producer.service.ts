import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/message-broker/producer/producer.service';
import { FeedbackDto } from '../dto/FeedbackDto';

@Injectable()
export class FeedbackProducerService {
  constructor(private readonly producerService: ProducerService) {}
  async feedback(messageData: FeedbackDto) {
    await this.producerService.produce('feedback', {
      value: JSON.stringify(messageData),
      key: 'feedback',
      headers: { type: 'feedback' },
    });
    return 'Sale notified!';
  }
}
