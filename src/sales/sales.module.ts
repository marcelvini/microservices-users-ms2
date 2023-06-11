import { Module } from '@nestjs/common';
import { SalesConsumerService } from './consumer/sales-consumer.service';
import { MessageBrokerModule } from 'src/message-broker/message-broker.module';

@Module({
  imports: [MessageBrokerModule],
  providers: [SalesConsumerService],
})
export class SalesModule {}
