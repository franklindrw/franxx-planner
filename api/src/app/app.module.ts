import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';

@Module({
  imports: [UsersModule, AuthModule],
  providers: [PrismaService, CryptoService, UsersService, UsersRepository],
  exports: [UsersService],
})
export class AppModule {}
