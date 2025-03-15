import { Injectable, BadGatewayException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService) {}
    async create(createUserDto: CreateUserDto){
        const {email, password, nif,role} = createUserDto;


        //verificação do email e nif
        const userExists = await this.prisma.user.findFirst({
            where: {OR: [{email},{nif}],
        },
        });


        if (userExists){
            throw new BadGatewayException('E-mail ou NIF já cadastrados')
        }

 // Criar o usuário 
 const hashedPassword = await bcrypt.hash(password, 10);

 return this.prisma.user.create({
    data: {
      name: createUserDto.name,
      nif,
      email,
      password: hashedPassword,
      role, 
      balance: createUserDto.balance || 0, 
    },

  });
}

async deposit(userId: string, amount: number) {
  if (amount <= 0) {
    throw new BadRequestException('O valor do depósito deve ser maior que zero.');
  }

  return this.prisma.user.update({
    where: { id: userId },
    data: { balance: { increment: amount } }, 
  });
}

async findAll() {
  return this.prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, balance: true },
  });
}

async findOne(userId: string) {
  return this.prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, role: true, balance: true },
  });
}

}