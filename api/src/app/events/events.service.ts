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
import { EventDetail } from './models/entities/event-detail.entity';
import { CreateEventLinkDto } from './models/dto/event-links/create-event-link.dto';

@Injectable()
export class EventsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly EventsRepository: EventsRepository,
  ) {}

  async findAllToUser(token: string) {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];
    return await this.EventsRepository.findEvents(userId);
  }

  async findOne(id: number, token: string): Promise<EventDetail> {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    // verifica se o evento existe
    const event = await this.EventsRepository.findEventById(id);

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    // verifica o acesso do usuário ao evento
    const userAccessEvent = await this.EventsRepository.accessVerify(
      id,
      userId,
    );

    if (!userAccessEvent) {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este evento',
      );
    }

    return event;
  }

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

  async addLink(token: string, eventId: number, data: CreateEventLinkDto) {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    // verifica se o evento existe
    const event = await this.EventsRepository.verifyEventExists(eventId);

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    //verifica se o usuário tem acesso ao evento
    const userAccessEvent = await this.EventsRepository.accessVerify(
      eventId,
      userId,
    );

    if (!userAccessEvent || userAccessEvent.role !== 'ORGANIZER') {
      throw new UnauthorizedException(
        'Você não tem permissão para acessar este evento',
      );
    }

    // adiciona o link ao evento
    return await this.EventsRepository.createLink(eventId, data);
  }

  async update(
    token: string,
    eventId: number,
    updateEventDto: UpdateEventDto,
  ): Promise<EventDetail> {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    // verifica se o evento existe
    const event = await this.EventsRepository.verifyEventExists(eventId);

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    // verifica o acesso do usuário ao evento
    const userAccessEvent = await this.EventsRepository.accessVerify(
      eventId,
      userId,
    );

    if (!userAccessEvent || userAccessEvent.role !== 'ORGANIZER') {
      throw new UnauthorizedException(
        'Você não tem permissão para editar este evento',
      );
    }

    // transforma a data para o formato ISO
    if (updateEventDto.date) {
      updateEventDto.date = new Date(updateEventDto.date).toISOString();
    }

    // altera os dados do evento
    return await this.EventsRepository.updateEvent(eventId, updateEventDto);
  }

  async remove(token: string, eventId: number) {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    // verifica se o evento existe
    const event = await this.EventsRepository.verifyEventExists(eventId);

    if (!event) {
      throw new NotFoundException('Evento não encontrado');
    }

    // verifica o acesso do usuário ao evento
    const userAccessEvent = await this.EventsRepository.accessVerify(
      eventId,
      userId,
    );

    if (!userAccessEvent || userAccessEvent.role !== 'ORGANIZER') {
      throw new UnauthorizedException(
        'Você não tem permissão para remover este evento',
      );
    }

    // remove o evento
    return await this.EventsRepository.removeEvent(+eventId);
  }
}
