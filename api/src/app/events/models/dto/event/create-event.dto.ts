import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: 'Título do evento', example: 'Título do evento' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Descrição do evento',
    example: 'Descrição do evento',
  })
  @IsEmpty()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Data do evento', example: '2023-10-01' })
  @IsNotEmpty()
  @IsDateString()
  date: string;

  @ApiProperty({ description: 'Endereço do evento', example: 'Rua A, 123' })
  @IsEmpty()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Hora do evento', example: '14:00' })
  @IsEmpty()
  @IsString()
  time?: string | null;
}
