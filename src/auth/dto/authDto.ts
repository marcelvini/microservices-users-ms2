import { ApiProperty } from '@nestjs/swagger';
class authDto {
  @ApiProperty({
    example: 'any@email.com',
    description: 'its the user email.',
  })
  email: string;
  @ApiProperty({
    example: '123456',
    description: 'its the user password.',
  })
  password: string;
}
export { authDto };
