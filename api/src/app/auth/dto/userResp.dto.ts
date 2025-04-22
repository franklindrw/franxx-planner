import { ApiProperty } from '@nestjs/swagger';

export class UserRespDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Franklin' })
  name: string;

  @ApiProperty({ example: 'franklin@email.com' })
  email: string;
}
