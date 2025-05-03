import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventLinkDto {
  @ApiProperty({ title: 'Título do link', example: 'Título do link' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ title: 'Link do evento', example: 'https://example.com' })
  @IsNotEmpty()
  @IsString()
  link: string;
}
