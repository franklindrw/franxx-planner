import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateParticipantDto {
  @ApiProperty({
    description: 'ID da incrição do participante',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  participantId: number;

  @ApiProperty({
    description: 'Status da incrição do participante',
    enum: ['ACCEPTED', 'PENDING', 'REJECTED'],
    required: true,
  })
  @IsEnum(['ACCEPTED', 'PENDING', 'REJECTED'])
  @IsNotEmpty()
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
}
