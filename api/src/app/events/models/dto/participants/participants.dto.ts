import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddParticipantsDto {
  @ApiProperty({ title: 'ID do evento', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @ApiProperty({ title: 'ID do participante', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  participantId: number;
}

export class RemoveParticipantsDto {
  @ApiProperty({ title: 'ID do evento', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  eventId: number;

  @ApiProperty({ title: 'ID do participante', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  participantId: number;
}
