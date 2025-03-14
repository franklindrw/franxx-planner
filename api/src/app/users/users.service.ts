import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async create(createUserDto: UserCreateDto): Promise<User> {
    const existingEmail = await this.usersRepo.findByEmail(createUserDto.email);
    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    if (createUserDto.google_id) {
      const existingGoogleId = await this.usersRepo.findByGoogleId(
        createUserDto.google_id,
      );
      if (existingGoogleId) {
        throw new BadRequestException('Google ID already exists');
      }
    }
    return this.usersRepo.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo.findAll();
  }

  async findById(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const user = await this.usersRepo.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findByGoogleId(google_id: string): Promise<User> {
    if (!google_id) {
      throw new BadRequestException('Google ID is required');
    }
    const user = await this.usersRepo.findByGoogleId(google_id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UserUpdateDto): Promise<User> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    return await this.usersRepo.update(id, updateUserDto);
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    return await this.usersRepo.remove(id);
  }
}
