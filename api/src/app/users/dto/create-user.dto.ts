import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  /**
   * Nome do usuário
   */
  @IsString()
  @IsNotEmpty()
  first_name: string;

  /**
   * Sobrenome do usuário
   */
  @IsString()
  @IsNotEmpty()
  last_name: string;

  /**
   * Email do usuário
   */
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * Senha do usuário
   */
  @IsString()
  @IsNotEmpty()
  password: string;

  /**
   * Link da foto do usuário
   */
  @IsString()
  @IsOptional()
  picture?: string;

  /**
   * Id da conta do google
   */
  @IsString()
  @IsOptional()
  googleId?: string;
}
