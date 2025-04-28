import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export interface IUpdatePassDto {
  current_pass: string;
  new_pass: string;
}

export class UpdatePassDto implements IUpdatePassDto {
  @ApiProperty({ description: 'Senha atual', example: 'P4ssw0rd' })
  @IsString()
  @IsNotEmpty()
  current_pass: string;

  @ApiProperty({ description: 'Nova senha', example: 'P4ssw0rd' })
  @IsString()
  @IsNotEmpty()
  new_pass: string;
}
