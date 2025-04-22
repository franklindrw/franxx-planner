import { ApiProperty } from '@nestjs/swagger';
import { UserRespDto } from '../dto/userResp.dto';

type User = {
  id: number;
  name: string;
  email: string;
};

export interface IAuthResp {
  access_token: string;
  user: User;
}

export class AuthResp implements IAuthResp {
  @ApiProperty({ description: 'Token de acesso' })
  access_token: string;

  @ApiProperty({ description: 'Dados do usuário logado' })
  user: UserRespDto;
}
