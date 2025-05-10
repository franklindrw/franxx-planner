import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Participant } from './entities/participant.entity';
import { UsersService } from '../users/users.service';
import { EventsRepository } from '../events/repositories/events.repository';
import { ParticipantsRepository } from './participants.repository';

import type { ITokenData } from '../auth/models/token-data.entity';
import { AddParticipantDto } from './dto/add-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Injectable()
export class ParticipantsService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly participantsRepository: ParticipantsRepository,
    private readonly usersService: UsersService,
    private readonly eventsRepository: EventsRepository,
  ) {}

  async addParticipant(
    token: string,
    addParticipantDto: AddParticipantDto,
  ): Promise<{ message: string }> {
    const decodedToken: ITokenData = await this.jwtService.decode(token);
    const userId = decodedToken['id'];

    // verifica se o usuário tem permissão para adicionar participantes
    const userAccessEvent = await this.eventsRepository.accessVerify(
      addParticipantDto.eventId,
      userId,
    );

    if (!userAccessEvent || userAccessEvent.role !== 'ORGANIZER') {
      throw new UnauthorizedException(
        'Você não tem permissão para adicionar participantes a este evento',
      );
    }

    // verifica se o usuário existe
    const user = await this.usersService.findByEmail(addParticipantDto.email);

    if (!user) {
      throw new NotFoundException('Esse e-mail não está cadastrado no sistema');
    }

    await this.participantsRepository.addParticipant(
      addParticipantDto.eventId,
      user.id,
    );

    return {
      message: `convite enviado para ${user.first_name} ${user.last_name}`,
    };
  }

  async findUsersByEventId(eventId: number): Promise<Participant[]> {
    return await this.participantsRepository.listParticipantsByEventId(
      +eventId,
    );
  }

  // async findEventsByUserId(userId: number): Promise<Participant[]> {}

  async updateStatus(updateParticipantDto: UpdateParticipantDto) {
    await this.participantsRepository.updateStatus(updateParticipantDto);

    return { message: 'status do participante foi alterado' };
  }

  async remove(participantId: number) {
    await this.participantsRepository.removeParticipant(participantId);

    return { message: 'participante removido com sucesso' };
  }
}
