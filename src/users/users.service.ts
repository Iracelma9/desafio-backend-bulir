import { Injectable, BadGatewayException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService) {}
    async create(createUserDto: CreateUserDto){
        const {email, password, nif,role} = createUserDto;


        //verificação do email, password, e nif
        const userExists = await this.prisma.user.findFirst({
            where: {OR: [{email},{nif}],
        },
        });


        if (userExists){
            throw new BadGatewayException('E-mail ou NIF já cadastrados')
        }

 // Criar o usuário no banco de dados
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
}