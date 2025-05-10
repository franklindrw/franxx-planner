import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';

export class UpdateStatusParticipantDto {
  @ApiProperty({ description: 'id do usuário participante', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'id do evento', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  eventId: number;

  @ApiProperty({
    description: 'Status da incrição do participante',
    enum: ['ACCEPTED', 'PENDING', 'REJECTED'],
    required: true,
  })
  @IsEnum(['ACCEPTED', 'PENDING', 'REJECTED'])
  @IsNotEmpty()
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
}
