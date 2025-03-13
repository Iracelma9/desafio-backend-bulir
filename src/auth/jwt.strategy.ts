import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecret', 
    });
  }

  async validate(payload: { id: string; role: string }) {
    console.log('Payload do Token:', payload);

    if (!payload.id) {
      throw new UnauthorizedException('Token inválido: ID ausente');
    }

    const user = await this.prisma.user.findUnique({ where: { id: payload.id } });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return user; 
  }
}
