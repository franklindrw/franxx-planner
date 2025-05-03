import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateEventDto } from './models/dto/event/create-event.dto';
import { UpdateEventDto } from './models/dto/event/update-event.dto';
import { EventsRepository } from './repositories/events.repository';
import type { ITokenData } from '../auth/models/token-data.entity';

@Injectable()
export class EventsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly EventsRepository: EventsRepository,
  ) {}

  async create(token: string, createEventDto: CreateEventDto) {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    createEventDto.date = new Date(createEventDto.date).toISOString();

    const newEvent = await this.EventsRepository.createEvent(createEventDto);

    await this.EventsRepository.linkUserToEvent({
      userId,
      eventId: newEvent.id,
      role: 'ORGANIZER',
      status: 'ACCEPTED',
    });

    return newEvent;
  }

  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
