import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';

import { mapEventParticipant } from './mappers/eventParticipant.map';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async listParticipantsByEventId(eventId: number) {
    const participants = await this.prismaService.eventsUsers.findMany({
      where: {
        event_id: eventId,
      },
      select: {
        id: true,
        user_id: true,
        role: true,
        status: true,
        user: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });

    return participants.map(mapEventParticipant);
  }

  async addParticipant(eventId: number, userId: number) {
    return await this.prismaService.eventsUsers.create({
      data: {
        event_id: eventId,
        user_id: userId,
        role: 'PARTICIPANT',
        status: 'PENDING',
      },
    });
  }

  async updateStatus(data: UpdateParticipantDto) {
    return await this.prismaService.eventsUsers.update({
      where: {
        id: data.participantId,
      },
      data: {
        status: data.status,
      },
    });
  }

  async removeParticipant(participantId: number) {
    return await this.prismaService.eventsUsers.delete({
      where: {
        id: participantId,
      },
    });
  }
}
