import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { ParticipantsService } from './participants.service';

import { AddParticipantDto } from './dto/add-participant.dto';
import { Participant } from './entities/participant.entity';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 201,
    description: 'convite enviado para usuário X',
  })
  @ApiResponse({
    status: 403,
    description:
      'Você não tem permissão para adicionar participantes a este evento',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado',
  })
  addParticipant(
    @Req() req: Request,
    @Body() addParticipantDto: AddParticipantDto,
  ) {
    const token: string = req.headers['authorization']!.split(' ')[1];
    return this.participantsService.addParticipant(token, addParticipantDto);
  }

  @Get(':eventId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: [Participant] })
  findUsersByEvent(@Param('eventId') eventId: number) {
    return this.participantsService.findUsersByEventId(+eventId);
  }

  @Patch('status-update')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'status do participante foi alterado',
  })
  @ApiResponse({
    status: 403,
    description:
      'Você não tem permissão para adicionar participantes a este evento',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado',
  })
  update(@Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.updateStatus(updateParticipantDto);
  }

  @Delete(':participantId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'participante removido com sucesso',
  })
  @ApiResponse({
    status: 403,
    description:
      'Você não tem permissão para adicionar participantes a este evento',
  })
  @ApiResponse({
    status: 404,
    description: 'Evento não encontrado',
  })
  remove(@Param('participantId') participantId: string) {
    return this.participantsService.remove(+participantId);
  }
}
