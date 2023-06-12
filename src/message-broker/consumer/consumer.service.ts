import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConsumerConfig, ConsumerSubscribeTopic, KafkaMessage } from 'kafkajs';

import { KafkajsConsumer } from '../implementations/kafkajs-consumer';
import { IConsumer } from '../interfaces/consumer.interface';
import { FeedbackProducerService } from 'src/feedback/producer/feedback-producer.service';

interface KafkajsConsumerOptions {
  topic: ConsumerSubscribeTopic;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  private readonly consumers: IConsumer[] = [];

  constructor(
    private readonly configService: ConfigService,
    private feedbackProducerService: FeedbackProducerService,
  ) {}

  async consume({
    topic,
    config,
    onMessage,
  }: KafkajsConsumerOptions): Promise<void> {
    const consumer = new KafkajsConsumer(
      topic,
      config,
      this.configService.get('KAFKA_BROKER'),
      this.feedbackProducerService,
    );
    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
