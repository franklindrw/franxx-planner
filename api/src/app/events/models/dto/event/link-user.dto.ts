export interface LinkUserDto {
  userId: number;
  eventId: number;
  role: 'ORGANIZER' | 'PARTICIPANT';
  status: 'ACCEPTED' | 'PENDING' | 'REJECTED';
}
