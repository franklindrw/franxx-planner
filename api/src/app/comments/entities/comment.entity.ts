import { ApiProperty } from '@nestjs/swagger';

export class Comment {
  @ApiProperty({ description: 'ID do comentário', example: 1 })
  id: number;

  @ApiProperty({ description: 'ID do evento', example: 1 })
  event_id: number;

  @ApiProperty({ description: 'ID do usuário', example: 1 })
  user_id: number;

  @ApiProperty({ description: 'Comentario', example: 'Comentario' })
  comment: string;

  @ApiProperty({
    description: 'Data de criação do comentário',
    example: '2023-10-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do comentário',
    example: '2023-10-01T00:00:00Z',
  })
  updatedAt: Date;
}
