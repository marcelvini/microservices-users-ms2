import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/message-broker/consumer/consumer.service';
@Injectable()
export class SalesConsumerService implements OnModuleInit {
  constructor(private readonly consumerService: ConsumerService) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'sales' },
      config: { groupId: 'sales-consumer' },
      onMessage: async (message) => {
        console.log({
          value: message.value.toString(),
        });
        throw new Error('test errror');
      },
    });
  }
}
