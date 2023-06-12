import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConsumerService } from 'src/message-broker/consumer/consumer.service';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class SalesConsumerService implements OnModuleInit {
  constructor(
    private readonly consumerService: ConsumerService,
    private userService: UsersService,
  ) {}

  async onModuleInit() {
    await this.consumerService.consume({
      topic: { topic: 'sales' },
      config: { groupId: 'sales-consumer' },
      onMessage: async (message) => {
        const parsedMessage = JSON.parse(message.value.toString());
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30);
        let courseRole: string;
        if (parsedMessage.productId === '123456') {
          courseRole = 'COURSE_XYZ';
        } else if (parsedMessage.productId === '987654') {
          courseRole = 'COURSE_ABCD';
        }
        if (message.headers.type.toString() === 'sale') {
          await this.userService.addRoles(parsedMessage.buyerEmail, {
            role: courseRole,
            expiration: expirationDate,
          });
        } else if (message.headers.type.toString() === 'cancel') {
          await this.userService.removeRoles(parsedMessage.buyerEmail, {
            role: courseRole,
            expiration: expirationDate,
          });
        }
      },
    });
  }
}
