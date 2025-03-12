import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const existingEmail = await this.usersRepo.findByEmail(createUserDto.email);
    if (existingEmail) {
      throw new BadRequestException('Email already exists');
    }

    if (createUserDto.googleId) {
      const existingGoogleId = await this.usersRepo.findByGoogleId(
        createUserDto.googleId,
      );
      if (existingGoogleId) {
        throw new BadRequestException('Google ID already exists');
      }
    }
    return this.usersRepo.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepo.findAll();
  }

  async findById(id: number) {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    return await this.usersRepo.findById(id);
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return await this.usersRepo.findByEmail(email);
  }

  async findByGoogleId(google_id: string) {
    if (!google_id) {
      throw new BadRequestException('Google ID is required');
    }
    return await this.usersRepo.findByGoogleId(google_id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
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
