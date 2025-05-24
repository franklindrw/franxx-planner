import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [UsersModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsRepository,
    PrismaService,
    UsersService,
    UsersRepository,
    CryptoService,
  ],
})
export class CommentsModule {}
