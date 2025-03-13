import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';


@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.jwt_SECRET || 'supersecret',
      signOptions: { expiresIn: '2h'}//duracao do token
    })
  ],
  providers: [AuthService],
  controllers: [AuthController]
})

export class AuthModule {}
