import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { IEventRepository } from '../models/interfaces/event-repository.interface';
import { CreateEventDto } from '../models/dto/event/create-event.dto';

import type { IEvent } from '../models/entities/event.entity';
import type { LinkUserDto } from '../models/dto/event/link-user.dto';
import { IEventLink } from '../models/entities/event-link.entity';
import { UpdateEventDto } from '../models/dto/event/update-event.dto';

@Injectable()
export class EventsRepository implements IEventRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async accessVerify(
    eventId: number,
    userId: number,
  ): Promise<{
    role: 'ORGANIZER' | 'PARTICIPANT';
    status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
  } | null> {
    return await this.prismaService.eventsUsers.findFirst({
      where: {
        event_id: eventId,
        user_id: userId,
      },
      select: {
        role: true,
        status: true,
      },
    });
  }

  async verifyEventExists(eventId: number): Promise<boolean> {
    const result = await this.prismaService.$queryRaw<[{ exists: boolean }]>`
      SELECT EXISTS (
        SELECT 1
        FROM "EVENTS"
        WHERE id = ${eventId}
      ) AS "exists"
    `;

    return result[0].exists;
  }

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

  async findEventById(eventId: number) {
    return await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        address: true,
        createdAt: true,
        updatedAt: true,
        EventLinks: {
          select: {
            id: true,
            title: true,
            link: true,
          },
        },
        EventsUsers: {
          select: {
            user_id: true,
            role: true,
            status: true,
          },
        },
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

  async updateEvent(eventId: number, updateEventDto: UpdateEventDto) {
    return await this.prismaService.event.update({
      where: {
        id: eventId,
      },
      data: {
        ...updateEventDto,
      },
    });
  }

  async removeEvent(eventId: number): Promise<void> {
    await this.prismaService.event.delete({
      where: {
        id: Number(eventId),
      },
    });
  }
}
