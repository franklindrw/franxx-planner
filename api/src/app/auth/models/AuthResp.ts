import { ApiProperty } from '@nestjs/swagger';

export interface IAuthResp {
  access_token: string;
}

export class AuthResp implements IAuthResp {
  @ApiProperty({ description: 'Token de acesso' })
  access_token: string;
}
