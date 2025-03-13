import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from  'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ){}

    async login(email: string, password: string){
        //validacao de email
        const user = await this.prisma.user.findUnique({where: { email}});


        if (!user){
            throw new UnauthorizedException('email not founde!')
        }


           //validacao de senha
        const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
        return {
            access_token: token
        };
    }

}
