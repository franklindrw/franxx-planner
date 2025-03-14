import { ApiProperty } from '@nestjs/swagger';

export class IUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  password: string | null;
  picture: string | null;
  google_id: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User implements IUser {
  @ApiProperty({ description: 'ID do usuário', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'example@email.com',
  })
  email: string;

  @ApiProperty({ description: 'Nome do usuário', example: 'Franklin' })
  first_name: string;

  @ApiProperty({ description: 'Sobrenome do usuário', example: 'Campos' })
  last_name: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'P4ssw0rd',
  })
  password: string | null;

  @ApiProperty({
    description: 'URL da foto do usuário',
    example: 'https://example.com/picture.jpg',
    required: false,
  })
  picture: string | null;

  @ApiProperty({
    description: 'ID de indentificação no Google',
    example: '123456789',
    required: false,
  })
  google_id: string | null;

  @ApiProperty({
    description: 'Data de criação do usuário',
    example: new Date(),
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do usuário',
    example: new Date(),
  })
  updatedAt: Date;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.password = user.password;
    this.picture = user.picture;
    this.google_id = user.google_id;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
