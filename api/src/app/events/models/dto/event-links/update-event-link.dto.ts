import { PartialType } from '@nestjs/swagger';
import { CreateEventLinkDto } from './create-event-link.dto';

export class UpdateEventLinkDto extends PartialType(CreateEventLinkDto) {}
