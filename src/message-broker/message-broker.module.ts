import { Module, forwardRef } from '@nestjs/common';
import { ConsumerService } from './consumer/consumer.service';
import { ProducerService } from './producer/producer.service';
import { FeedbackModule } from 'src/feedback/feedback.module';

@Module({
  imports: [forwardRef(() => FeedbackModule)],
  providers: [ConsumerService, ProducerService],
  exports: [ProducerService, ConsumerService],
})
export class MessageBrokerModule {}
