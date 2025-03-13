import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto, clientId: string) {
    const { serviceId } = createReservationDto;

    // Verifica se o serviço existe
    const service = await this.prisma.service.findUnique({ where: { id: serviceId } });

    if (!service) {
      throw new BadRequestException('Serviço não encontrado');
    }

    // Verifica se o usuário é um CLIENT
    const client = await this.prisma.user.findUnique({ where: { id: clientId } });

    if (!client || client.role !== 'CLIENT') {
      throw new ForbiddenException('Somente clientes podem reservar serviços');
    }

    // Verifica se o cliente tem saldo suficiente
    if (client.balance < service.price) {
      throw new BadRequestException('Saldo insuficiente para reservar este serviço');
    }

    // Atualiza o saldo do cliente e do prestador
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: clientId },
        data: { balance: client.balance - service.price },
      }),
      this.prisma.user.update({
        where: { id: service.providerId },
        data: { balance: { increment: service.price } },
      }),
      this.prisma.reservation.create({
        data: {
          clientId,
          serviceId,
        },
      }),
    ]);

    return { message: 'Reserva criada com sucesso!' };
  }

  async findAll() {
    return this.prisma.reservation.findMany({
      include: {
        client: { select: { name: true, email: true } },
        service: { select: { name: true, price: true, providerId: true } },
      },
    });
  }
}
