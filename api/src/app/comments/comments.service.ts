import { JwtService } from '@nestjs/jwt';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { CommentsRepository } from './comments.repository';

import { EventsService } from '../events/events.service';

import type { ITokenData } from '../auth/models/token-data.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly eventsService: EventsService,
    private readonly jwtService: JwtService,
  ) {}

  async create(token: string, data: CreateCommentDto) {
    const decodedToken: ITokenData = await this.jwtService.decode(token);
    const userId = decodedToken['id'];

    return this.commentsRepository.createComment(+userId, data);
  }

  async findCommentsByEventId(token: string, event_id: number) {
    // verifica se o evento existe
    const event = await this.eventsService.findOne(+event_id, token);
    if (!event) {
      throw new NotFoundException('Evento nao encontrado');
    }

    return await this.commentsRepository.getCommentsByEventId(+event_id);
  }

  async update(token: string, event_id: number, data: UpdateCommentDto) {
    // verifica se o evento existe
    const event = await this.eventsService.findOne(+event_id, token);
    if (!event) {
      throw new NotFoundException('Evento nao encontrado');
    }

    return await this.commentsRepository.updateComment(data);
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
