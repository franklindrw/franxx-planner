import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { CommentsRepository } from './comments.repository';
import type { ITokenData } from '../auth/models/token-data.entity';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(token: string, data: CreateCommentDto) {
    const decodedToken: ITokenData = await this.jwtService.decode(token);
    const userId = decodedToken['id'];

    return this.commentsRepository.createComment(+userId, data);
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
