import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

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

  async findCommentById(comment_id: number) {
    return await this.prismaService.eventComment.findUnique({
      where: {
        id: comment_id,
      },
    });
  }

  async updateComment(data: UpdateCommentDto) {
    return await this.prismaService.eventComment.update({
      where: {
        id: +data.comment_id,
      },
      data: {
        comment: data.comment,
      },
    });
  }

  async deleteComment(comment_id: number) {
    return await this.prismaService.eventComment.delete({
      where: {
        id: comment_id,
      },
    });
  }
}
