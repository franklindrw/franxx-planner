import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from 'src/shared/crypto/crypto.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UsersRepository } from '../users/users.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '2h', algorithm: 'HS256' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CryptoService,
    UsersService,
    UsersRepository,
    PrismaService,
  ],
})
export class AuthModule {}
