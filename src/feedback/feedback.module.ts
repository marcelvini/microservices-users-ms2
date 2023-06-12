import { Module, forwardRef } from '@nestjs/common';
import { FeedbackProducerService } from './producer/feedback-producer.service';
import { MessageBrokerModule } from 'src/message-broker/message-broker.module';

@Module({
  imports: [forwardRef(() => MessageBrokerModule)],
  providers: [FeedbackProducerService],
  exports: [FeedbackProducerService],
})
export class FeedbackModule {}
