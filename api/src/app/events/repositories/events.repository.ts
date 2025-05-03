import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IEventRepository } from '../models/interfaces/event-repository.interface';
import { CreateEventDto } from '../models/dto/event/create-event.dto';

import type { IEvent } from '../models/entities/event.entity';
import type { LinkUserDto } from '../models/dto/event/link-user.dto';
import { IEventLink } from '../models/entities/event-link.entity';

@Injectable()
export class EventsRepository implements IEventRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
    return await this.prismaService.event.create({
      data: {
        ...createEventDto,
      },
    });
  }

  async linkUserToEvent(linkUserDto: LinkUserDto) {
    await this.prismaService.eventsUsers.create({
      data: {
        user_id: linkUserDto.userId,
        event_id: linkUserDto.eventId,
        role: linkUserDto.role,
        status: linkUserDto.status,
      },
    });
  }

  async findEvents(userId: number): Promise<IEvent[]> {
    return await this.prismaService.event.findMany({
      where: {
        EventsUsers: {
          some: {
            user_id: userId,
          },
        },
      },
    });
  }

  async findEventById(eventId: number): Promise<IEvent | null> {
    return await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });
  }

  async findUserByEventId(
    eventId: number,
    userId: number,
  ): Promise<IEvent | null> {
    return await this.prismaService.event.findFirst({
      where: {
        id: eventId,
        EventsUsers: {
          some: {
            user_id: userId,
          },
        },
      },
    });
  }

  async findLinksByEventId(eventId: number): Promise<IEventLink[]> {
    return await this.prismaService.eventLink.findMany({
      where: {
        event_id: eventId,
      },
    });
  }
}
