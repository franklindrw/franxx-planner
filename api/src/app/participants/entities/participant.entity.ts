import { ApiProperty } from '@nestjs/swagger';

export class Participant {
  @ApiProperty({ description: 'ID do participante', example: 1 })
  participantId: number;

  @ApiProperty({
    description: 'ID do usuário',
    example: 3,
  })
  userId: number;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  userName: string;

  @ApiProperty({
    description: 'Tipo do acesso ao evento',
    example: 'ORGANIZER | PARTICIPANT',
  })
  role: 'ORGANIZER' | 'PARTICIPANT';

  @ApiProperty({
    description: 'Status do acesso ao evento',
    example: 'ACCEPTED | PENDING | REJECTED',
  })
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
}
