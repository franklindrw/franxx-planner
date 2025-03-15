import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService, CryptoService],
})
export class UsersModule {}
