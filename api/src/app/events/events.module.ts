import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './repositories/events.repository';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepository, PrismaService],
})
export class EventsModule {}
