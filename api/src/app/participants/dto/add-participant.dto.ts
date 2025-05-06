import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class AddParticipantDto {
  @ApiProperty({
    description: 'E-mail do usuário cadastrado',
    example: 'nicoly@email.com.br',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'ID do evento',
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  eventId: number;
}
