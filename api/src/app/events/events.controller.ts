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
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';

import { EventsService } from './events.service';
import { CreateEventDto } from './models/dto/event/create-event.dto';
import { UpdateEventDto } from './models/dto/event/update-event.dto';
import { AuthGuard } from '../auth/auth.guard';

import { Event } from './models/entities/event.entity';
import { EventDetail } from './models/entities/event-detail.entity';
import { EventLink } from './models/entities/event-link.entity';
import { CreateEventLinkDto } from './models/dto/event-links/create-event-link.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Event] })
  findAllToUser(@Req() req: Request) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.eventsService.findAllToUser(token);
  }

  @Get('detail/:eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: EventDetail })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado',
  })
  @ApiParam({
    name: 'eventId',
    description: 'ID do evento',
    required: true,
  })
  findOne(@Req() req: Request, @Param('eventId') eventId: string) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.eventsService.findOne(+eventId, token);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(201)
  @ApiResponse({ status: 201, type: CreateEventDto })
  @ApiResponse({
    status: 400,
    description: 'Os dados enviados estão incorretos',
  })
  create(@Req() req: Request, @Body() createEventDto: CreateEventDto) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.eventsService.create(token, createEventDto);
  }

  @Post('add-link/:eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: EventLink })
  @ApiResponse({
    status: 400,
    description: 'Os dados enviados estão incorretos',
  })
  AddLink(
    @Req() req: Request,
    @Param('eventId') eventId: number,
    @Body() addLink: CreateEventLinkDto,
  ) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.eventsService.addLink(token, +eventId, addLink);
  }

  @Patch(':eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: EventDetail })
  @ApiResponse({
    status: 400,
    description: 'Os dados enviados estão incorretos',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado',
  })
  @ApiResponse({
    status: 403,
    description: 'Você não tem permissão para acessar este evento',
  })
  @ApiParam({
    name: 'eventId',
    description: 'ID do evento',
    required: true,
    type: 'number',
  })
  update(
    @Req() req: Request,
    @Param('eventId') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.eventsService.update(token, +eventId, updateEventDto);
  }

  @Delete(':eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: EventDetail })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado',
  })
  @ApiParam({
    name: 'eventId',
    description: 'ID do evento',
    required: true,
    type: 'number',
  })
  remove(@Req() req: Request, @Param('eventId') eventId: string) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.eventsService.remove(token, +eventId);
  }
}
