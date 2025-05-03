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
  Headers,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiResponse } from '@nestjs/swagger';

import { EventsService } from './events.service';
import { CreateEventDto } from './models/dto/event/create-event.dto';
import { UpdateEventDto } from './models/dto/event/update-event.dto';
import { AuthGuard } from '../auth/auth.guard';

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
  @ApiHeader({
    name: 'authorization',
    description: 'Bearer token',
    required: false,
  })
  async create(
    @Headers('authorization') authorization: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    const token = authorization.split(' ')[1];
    return await this.eventsService.create(token, createEventDto);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
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
