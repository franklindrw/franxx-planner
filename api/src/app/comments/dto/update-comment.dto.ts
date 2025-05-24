import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ description: 'ID do comentário', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  comment_id: number;

  @ApiProperty({
    description: 'Nova mensagem',
    example: 'nova mensagem atualizada',
  })
  @IsNotEmpty()
  @IsString()
  comment: string;
}
