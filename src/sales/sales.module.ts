import { Module } from '@nestjs/common';
import { SalesConsumerService } from './consumer/sales-consumer.service';
import { MessageBrokerModule } from 'src/message-broker/message-broker.module';
import { FeedbackModule } from 'src/feedback/feedback.module';

@Module({
  imports: [MessageBrokerModule, FeedbackModule],
  providers: [SalesConsumerService],
})
export class SalesModule {}
