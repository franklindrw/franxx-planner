import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './entities/user.entity';
import { CryptoService } from 'src/shared/crypto/crypto.service';
import { UpdatePassDto } from './dto/update-pass.dto';

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

  /**
   * Atualiza a senha do usuário.
   * @param id ID do usuário
   * @param UpdatePassDto Objeto contendo a senha atual e a nova senha
   * @returns usuário atualizado
   */
  async updatePassword(
    id: number,
    UpdatePassDto: UpdatePassDto,
  ): Promise<{ message: string }> {
    const { current_pass, new_pass } = UpdatePassDto;

    /** busca os dados do usuário  */
    const user = await this.usersRepo.findById(id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    /** verifica se a senha atual está correta  */
    const isPasswordValid = await this.cryptoService.verifyPassword(
      user.password!,
      current_pass,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Senha atual está incorreta');
    }

    /** cryptografa e envia a nova senha para atualizar */
    const hashedPassword = await this.cryptoService.hashPassword(new_pass);
    await this.usersRepo.updatePassword(id, hashedPassword);

    return { message: 'Senha atualizada com sucesso' };
  }

  async remove(id: number) {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    return await this.usersRepo.remove(id);
  }
}
