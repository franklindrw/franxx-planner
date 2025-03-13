import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Nome do usuário', example: 'Franklin' })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Campos', description: 'Sobrenome do usuário' })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: 'example@email.com',
    description: 'Email do usuário',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'P4ssw0rd',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    example: 'https://example.com/picture.jpg',
    description: 'URL da foto do usuário',
    required: false,
  })
  @IsString()
  @IsOptional()
  picture?: string;

  @ApiProperty({
    example: '123456789',
    description: 'ID do usuário no Google',
    required: false,
  })
  @IsString()
  @IsOptional()
  googleId?: string;
}
