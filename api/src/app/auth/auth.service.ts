import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';

import type { IAuthResp } from './models/AuthResp';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private cryptoService: CryptoService,
  ) {}

  async login(loginDto: LoginDto): Promise<IAuthResp> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || !user.password) {
      throw new NotFoundException('Este usuário não foi encontrado');
    }

    const isPasswordValid = await this.cryptoService.verifyPassword(
      user.password,
      loginDto.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Usuário ou senha incorreta');
    }

    const token = this.jwtService.sign({
      email: user.email,
      id: user.id,
      name: user.first_name,
    });

    return { access_token: token };
  }
}
