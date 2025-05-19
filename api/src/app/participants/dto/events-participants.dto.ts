import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class EventsParticipantsDto {
  @ApiProperty({
    description: 'ID do evento',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  eventId?: number;

  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  userId?: number;
}
