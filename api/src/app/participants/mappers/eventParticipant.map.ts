import { User, EventsUsers } from '@prisma/client';
import { Participant } from '../entities/participant.entity';

export function mapEventParticipant(
  eventUser: EventsUsers & {
    user: Pick<User, 'first_name' | 'last_name'>;
  },
): Participant {
  return {
    participantId: eventUser.id,
    userId: eventUser.user_id,
    userName: `${eventUser.user.first_name} ${eventUser.user.last_name}`,
    role: eventUser.role,
    status: eventUser.status,
  };
}
