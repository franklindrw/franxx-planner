import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    description: 'Título do evento',
    example: 'Título do evento',
    maxLength: 100,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Descrição do evento',
    required: false,
  })
  @IsEmpty()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Data do evento', example: '2023-10-01' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({
    description: 'Endereço do evento',
    example: 'Rua A, 123',
    maxLength: 100,
    required: false,
  })
  @IsEmpty()
  @IsString()
  @MaxLength(100)
  address?: string;

  @ApiProperty({
    description: 'Hora do evento',
    example: '14:00',
    maxLength: 5,
    required: false,
  })
  @IsEmpty()
  @IsString()
  @MaxLength(5)
  time?: string | null;
}
