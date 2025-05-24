import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: 'ID do evento', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  event_id: number;

  @ApiProperty({ description: 'Comentario', example: 'Comentario' })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
