import { CreateEventDto } from '../dto/event/create-event.dto';
import { LinkUserDto } from '../dto/event/link-user.dto';
import { UpdateEventDto } from '../dto/event/update-event.dto';
import type { IEvent } from '../entities/event.entity';

export abstract class IEventRepository {
  abstract findEvents(userId: number): Promise<IEvent[]>;

  abstract findEventById(eventId: number): Promise<IEvent | null>;

  abstract createEvent(createEventDto: CreateEventDto): Promise<IEvent>;

  abstract linkUserToEvent(linkUserDto: LinkUserDto): Promise<void>;

  abstract updateEvent(
    eventId: number,
    UpdateEventDto: UpdateEventDto,
  ): Promise<IEvent>;

  abstract accessVerify(
    eventId: number,
    userId: number,
  ): Promise<{
    role: 'ORGANIZER' | 'PARTICIPANT';
    status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
  } | null>;

  abstract removeEvent(eventId: number): Promise<void>;
}
