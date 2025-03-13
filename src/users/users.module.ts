import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
