import { Body, Controller, Post, Get, Patch, UseGuards, Req, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Cadastro de Usuário' })
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Adicionar saldo' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('deposit')
  async deposit(@Body('amount') amount: number, @Req() req: Request) {
    const userId = req.user?.['id'];
    return this.usersService.deposit(userId, amount);
  }

  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Listar os usuários pelo ID' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
