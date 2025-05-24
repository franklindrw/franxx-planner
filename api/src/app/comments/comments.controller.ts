import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Comment })
  create(@Req() req: Request, @Body() createCommentDto: CreateCommentDto) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.commentsService.create(token, createCommentDto);
  }

  @Get(':eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: Comment })
  findCommentsByEvent(@Req() req: Request, @Param('eventId') eventId: number) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.commentsService.findCommentsByEventId(token, eventId);
  }

  @Patch(':eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Comment })
  update(
    @Req() req: Request,
    @Param('eventId') eventId: number,
    @Body() data: UpdateCommentDto,
  ) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.commentsService.update(token, +eventId, data);
  }

  @Delete(':commentId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Comment })
  remove(@Req() req: Request, @Param('commentId') commentId: number) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.commentsService.remove(token, +commentId);
  }
}
