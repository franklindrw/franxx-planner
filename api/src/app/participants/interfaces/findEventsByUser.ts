import {
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsString,
  IsEmpty,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export interface IFindEventsByUser {
  participant_id: number;
  title: string;
  description?: string | null;
  date?: Date | null;
  time?: string | null;
  address?: string | null;
  role: 'ORGANIZER' | 'PARTICIPANT';
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
}

export class FindEventsByUser implements IFindEventsByUser {
  @ApiProperty({ description: 'ID do usuário', example: 1 })
  @IsNumber()
  @IsNotEmpty()
  participant_id: number;

  @ApiProperty({ description: 'Título do evento', example: 'Título do evento' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Descrição do evento',
  })
  @IsString()
  @IsEmpty()
  description?: string | null;

  @ApiProperty({ description: 'Data do evento', example: '2023-10-01' })
  @IsNotEmpty()
  @IsDateString()
  date?: Date | null;

  @ApiProperty({ description: 'Hora do evento', example: '13:30' })
  @IsNotEmpty()
  @IsString()
  time?: string | null;

  @ApiProperty({ description: 'Endereço do evento', example: 'Rua A, 123' })
  @IsNotEmpty()
  @IsString()
  address?: string | null;

  @ApiProperty({
    description: 'Papel do usuário no evento',
    example: 'ORGANIZER',
  })
  @IsEnum(['ORGANIZER', 'PARTICIPANT'])
  @IsNotEmpty()
  role: 'ORGANIZER' | 'PARTICIPANT';

  @ApiProperty({
    description: 'Status do usuário no evento',
    example: 'ACCEPTED',
  })
  @IsEnum(['ACCEPTED', 'PENDING', 'REJECTED'])
  @IsNotEmpty()
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
}
