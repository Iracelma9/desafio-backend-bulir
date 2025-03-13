import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    async onModuleInit() {
      await this.$connect(); // Conectar ao banco ao iniciar o módulo
    }
  
    async onModuleDestroy() {
      await this.$disconnect(); // Desconectar do banco ao destruir o módulo
    }
  }