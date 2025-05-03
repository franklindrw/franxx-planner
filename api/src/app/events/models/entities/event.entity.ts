import { ApiProperty } from '@nestjs/swagger';

export interface IEventLinks {
  id: number;
  title: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  id: number;
  title: string;
  description?: string | null;
  date?: Date | null;
  address?: string | null;
  time?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Event implements IEvent {
  @ApiProperty({ description: 'ID do evento', example: 1 })
  id: number;

  @ApiProperty({ description: 'Título do evento', example: 'Título do evento' })
  title: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Descrição do evento',
  })
  description?: string;

  @ApiProperty({ description: 'Data do evento', example: '2023-10-01' })
  date: Date;

  @ApiProperty({ description: 'Endereço do evento', example: 'Rua A, 123' })
  address?: string;

  @ApiProperty({ description: 'Hora do evento', example: '13:30' })
  time?: string;

  @ApiProperty({
    description: 'Data de criação do evento',
    example: '2023-10-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do evento',
    example: '2023-10-01T00:00:00Z',
  })
  updatedAt: Date;
}
