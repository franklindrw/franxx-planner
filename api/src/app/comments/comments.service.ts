import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

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
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    // verifica se o evento existe
    const event = await this.eventsService.findOne(+event_id, token);
    if (!event) {
      throw new NotFoundException('Evento nao encontrado');
    }

    // verifica se o comentário existe
    const comment = await this.commentsRepository.findCommentById(
      data.comment_id,
    );
    if (!comment) {
      throw new NotFoundException('Comentario nao encontrado');
    }

    // verifica se o usuário tem acesso ao comentário
    if (comment.user_id !== userId) {
      throw new UnauthorizedException(
        ' Vocé nao tem permissão para editar este comentário',
      );
    }

    return await this.commentsRepository.updateComment(data);
  }

  async remove(token: string, comment_id: number) {
    const decodedToken: ITokenData = this.jwtService.decode(token);
    const userId = decodedToken['id'];

    // verifica se o comentário existe
    const comment = await this.commentsRepository.findCommentById(comment_id);
    if (!comment) {
      throw new NotFoundException('Comentario nao encontrado');
    }

    // verifica se o usuário tem acesso ao comentário
    if (comment.user_id !== userId) {
      throw new UnauthorizedException(
        ' Vocé nao tem permissão para remover este comentário',
      );
    }

    return await this.commentsRepository.deleteComment(comment_id);
  }
}
