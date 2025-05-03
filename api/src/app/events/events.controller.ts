import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { EventsService } from './events.service';
import { CreateEventDto } from './models/dto/event/create-event.dto';
import { UpdateEventDto } from './models/dto/event/update-event.dto';
import { AuthGuard } from '../auth/auth.guard';

import { Event } from './models/entities/event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiResponse({ status: 201, type: CreateEventDto })
  @ApiResponse({
    status: 400,
    description: 'Os dados enviados estão incorretos',
  })
  async create(@Req() req: Request, @Body() createEventDto: CreateEventDto) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return await this.eventsService.create(token, createEventDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Event] })
  findAllToUser(@Req() req: Request) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.eventsService.findAllToUser(token);
  }

  @Get('detail/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Event })
  findOne(@Req() req: Request, @Param('id') id: string) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.eventsService.findOne(+id, token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
