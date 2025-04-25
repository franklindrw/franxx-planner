import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';
import { CryptoService } from 'src/shared/crypto/crypto.service';

@Injectable()
export class UsersService {
  constructor(
    private usersRepo: UsersRepository,
    private cryptoService: CryptoService,
  ) {}

  async create(createUserDto: UserCreateDto): Promise<User> {
    const existingEmail = await this.usersRepo.findByEmail(createUserDto.email);
    if (existingEmail) {
      throw new BadRequestException('E-mail já cadastrado em nossa base.');
    }

    if (createUserDto.google_id) {
      const existingGoogleId = await this.usersRepo.findByGoogleId(
        createUserDto.google_id,
      );
      if (existingGoogleId) {
        throw new BadRequestException('Conta da Google já vinculada.');
      }
    }

    if (createUserDto.password) {
      createUserDto.password = await this.cryptoService.hashPassword(
        createUserDto.password,
      );
    }

    return this.usersRepo.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepo.findAll();
  }

  async findById(id: number): Promise<Partial<User>> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    const userData = await this.usersRepo.findById(id);

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const user = {
      id: userData.id,
      email: userData.email,
      first_name: userData.first_name,
      last_name: userData.last_name,
      picture: userData.picture,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
    };

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
