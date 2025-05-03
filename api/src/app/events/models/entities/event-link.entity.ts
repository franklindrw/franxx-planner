import { ApiProperty } from '@nestjs/swagger';

export interface IEventLink {
  id: number;
  title: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export class EventLink implements IEventLink {
  @ApiProperty({ description: 'ID do link', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Título do link',
    example: 'Título do link',
    maxLength: 100,
  })
  title: string;

  @ApiProperty({
    description: 'Link do evento',
    example: 'https://example.com',
    maxLength: 250,
  })
  link: string;

  @ApiProperty({
    description: 'Data de criação do link',
    example: '2023-10-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do link',
    example: '2023-10-01T00:00:00Z',
  })
  updatedAt: Date;
}
