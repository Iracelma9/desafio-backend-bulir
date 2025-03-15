import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}
  

  //  Criar  serviço
  async create(createServiceDto: CreateServiceDto, providerId: string) {
    const provider = await this.prisma.user.findUnique({ where: { id: providerId } });

    if (!provider) {
      throw new BadRequestException('Usuário não encontrado');
    }

    if (provider.role !== 'PROVIDER') {
      throw new ForbiddenException('Apenas prestadores de serviço podem cadastrar serviços');
    }

    return this.prisma.service.create({
      data: {
        name: createServiceDto.name,
        description: createServiceDto.description,
        price: createServiceDto.price,
        providerId,
      },
    });
  }

  //  Atualizar serviço existente
  
  async update(id: string, providerId: string, updateData: { name?: string; description?: string; price?: number }) {

    const service = await this.prisma.service.findUnique({ where: { id } });

    if (!service) {
      throw new NotFoundException('Serviço não encontrado.');
    }

    // Garante que apenas o prestador dono do serviço pode atualizá-lo
    if (service.providerId !== providerId) {
      throw new ForbiddenException('Você só pode atualizar seus próprios serviços.');
    }

    return this.prisma.service.update({
      where: { id },
      data: updateData,
    });
  }

  // Listar todos os serviços
  async findAll() {
    return this.prisma.service.findMany({
      include: { provider: { select: { name: true, email: true } } },
    });
  }
}
