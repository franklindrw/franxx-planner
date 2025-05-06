import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { ParticipantsController } from './participants.controller';
import { ParticipantsRepository } from './participants.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { EventsRepository } from '../events/repositories/events.repository';
import { UsersModule } from '../users/users.module';
import { EventsModule } from '../events/events.module';
import { UsersRepository } from '../users/users.repository';
import { CryptoService } from 'src/shared/crypto/crypto.service';

@Module({
  imports: [UsersModule, EventsModule],
  controllers: [ParticipantsController],
  providers: [
    ParticipantsService,
    ParticipantsRepository,
    PrismaService,
    UsersService,
    UsersRepository,
    EventsRepository,
    CryptoService,
  ],
})
export class ParticipantsModule {}
