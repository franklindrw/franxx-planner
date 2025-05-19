import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaService } from '../shared/prisma/prisma.service';
import { CryptoService } from 'src/shared/crypto/crypto.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
import { LoggerMiddleware } from 'src/logger/logger.middleware';
import { LoggerService } from 'src/logger/logger.service';
import { EventsModule } from './events/events.module';
import { ParticipantsModule } from './participants/participants.module';
import { CommentsModule } from './comments/comments.module';
@Module({
  imports: [AuthModule, UsersModule, EventsModule, ParticipantsModule, CommentsModule],
  providers: [
    PrismaService,
    CryptoService,
    UsersService,
    UsersRepository,
    LoggerMiddleware,
    LoggerService,
  ],
  exports: [UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // aplica para todas as rotas
  }
}
