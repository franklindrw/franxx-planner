import { ApiProperty } from '@nestjs/swagger';
import { EventLink } from './event-link.entity';

class EventUser {
  @ApiProperty({ description: 'ID do usuário', example: 1 })
  user_id: number;

  @ApiProperty({
    description: 'Papel do usuário no evento',
    example: 'ORGANIZER',
    enum: ['ORGANIZER', 'PARTICIPANT'],
  })
  role: string;

  @ApiProperty({
    description: 'Status do usuário no evento',
    example: 'ACCEPTED',
    enum: ['ACCEPTED', 'PENDING', 'REJECTED'],
  })
  status: string;
}

export class EventDetail {
  @ApiProperty({ description: 'ID do evento', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Título do evento',
    example: 'Título do evento',
    maxLength: 100,
  })
  title: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Descrição do evento',
    maxLength: 250,
    required: false,
  })
  description?: string | null;

  @ApiProperty({
    description: 'Data do evento',
    example: '2023-10-01T00:00:00Z',
    required: false,
  })
  date: Date | null;

  @ApiProperty({
    description: 'Horário do evento',
    example: '10:00',
    maxLength: 5,
    required: false,
  })
  time?: string | null;

  @ApiProperty({
    description: 'Endereço do evento',
    example: 'Rua Exemplo, 123, Cidade, Estado',
    maxLength: 250,
    required: false,
  })
  address?: string | null;

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

  @ApiProperty({
    description: 'Links do evento',
    type: [EventLink],
    required: false,
  })
  EventLinks?: EventLink[];

  @ApiProperty({
    description: 'Usuários do evento',
    type: [EventUser],
    required: false,
  })
  EventUsers?: EventUser[];
}
