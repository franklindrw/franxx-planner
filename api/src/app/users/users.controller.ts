import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { User } from './entities/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UpdatePassDto } from './dto/update-pass.dto';

import { AuthGuard } from 'src/app/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  @ApiBody({ type: UserCreateDto })
  @ApiResponse({ status: 201, type: User })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() createUserDto: UserCreateDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: User })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiBody({ type: UserUpdateDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UserUpdateDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch(':id/password')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Senha atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 401, description: 'Senha atual está incorreta' })
  @ApiBody({ type: UpdatePassDto })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdatePassDto: UpdatePassDto,
  ) {
    return this.usersService.updatePassword(+id, UpdatePassDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(204)
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'User deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(+id);
  }
}
