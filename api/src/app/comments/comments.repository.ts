import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createComment(user_id: number, dataRaw: CreateCommentDto) {
    return await this.prismaService.eventComment.create({
      data: {
        ...dataRaw,
        user_id,
      },
    });
  }

  async getCommentsByEventId(event_id: number) {
    return await this.prismaService.eventComment.findMany({
      where: {
        event_id,
      },
    });
  }
}
