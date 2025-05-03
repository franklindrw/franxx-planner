import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { CreateEventDto } from './models/dto/event/create-event.dto';
import { UpdateEventDto } from './models/dto/event/update-event.dto';
import { EventsRepository } from './repositories/events.repository';

import type { ITokenData } from '../auth/models/token-data.entity';
import type { Event } from './models/entities/event.entity';

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

  async findAllToUser(token: string) {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];
    return await this.EventsRepository.findEvents(userId);
  }

  async findOne(id: number, token: string): Promise<Event> {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    const userAccessEvent = await this.EventsRepository.findUserByEventId(
      id,
      userId,
    );

    if (!userAccessEvent) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este evento',
      );
    }

    const event = await this.EventsRepository.findEventById(id);

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    return {
      ...event,
      description: event.description ?? undefined,
      date: event.date!,
      time: event.time ?? undefined,
    };
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    console.log(updateEventDto);
    return `This action updates a #${id} event`;
  }

  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
