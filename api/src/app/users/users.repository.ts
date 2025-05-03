import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';

/**
 * Manipuladores de dados do banco relacionados aos usuários
 */
@Injectable()
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: UserCreateDto) {
    return await this.prisma.user.create({
      data: {
        ...createUserDto,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findByGoogleId(google_id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { google_id },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: UserUpdateDto): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        ...updateUserDto,
      },
    });
  }

  async updatePassword(id: number, password: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: {
        password,
      },
    });
  }

  async remove(id: number): Promise<User> {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
