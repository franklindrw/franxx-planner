import { Module } from '@nestjs/common';

import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';

import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';

import { EventsModule } from '../events/events.module';
import { EventsService } from '../events/events.service';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsRepository } from './comments.repository';

@Module({
  imports: [UsersModule, EventsModule],
  controllers: [CommentsController],
  providers: [
    CommentsService,
    CommentsRepository,
    PrismaService,
    UsersService,
    EventsService,
    UsersRepository,
    CryptoService,
  ],
})
export class CommentsModule {}
