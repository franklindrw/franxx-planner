import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';

@Module({
  imports: [UsersModule],
  providers: [PrismaService, CryptoService],
})
export class AppModule {}
