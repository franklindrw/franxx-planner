import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { AuthResp, IAuthResp } from './models/AuthResp';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: AuthResp })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  login(@Body() loginDto: LoginDto): Promise<IAuthResp> {
    return this.authService.login(loginDto);
  }
}
