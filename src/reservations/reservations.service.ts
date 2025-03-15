import { Injectable, NotFoundException,BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReservationDto: CreateReservationDto, clientId: string) {
    const { serviceId } = createReservationDto;

    // Verificacao do service  
    const service = await this.prisma.service.findUnique({ where: { id: serviceId } });

    if (!service) {
      throw new BadRequestException('Serviço não encontrado');
    }

    // Verificacao de role(cliente ou provedor)
    const client = await this.prisma.user.findUnique({ where: { id: clientId } });

    if (!client || client.role !== 'CLIENT') {
      throw new ForbiddenException('Somente clientes podem reservar serviços');
    }

    // Verificacao de saldo 
    if (client.balance < service.price) {
      throw new BadRequestException('Saldo insuficiente para reservar este serviço');
    }

    // Atualizacao do saldo 
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

//  Cancelar reserva
async cancelReservation(reservationId: string, clientId: string) {
  const reservation = await this.prisma.reservation.findUnique({
    where: { id: reservationId },
    include: { service: true },
  });

  if (!reservation) {
    throw new NotFoundException('Reserva não encontrada.');
  }

  if (reservation.clientId !== clientId) {
    throw new ForbiddenException('Você só pode cancelar suas próprias reservas.');
  }

  // Transação para reembolsar o cliente e descontar do prestador
  await this.prisma.$transaction([
    this.prisma.user.update({
      where: { id: clientId },
      data: { balance: { increment: reservation.service.price } },
    }),
    this.prisma.user.update({
      where: { id: reservation.service.providerId },
      data: { balance: { decrement: reservation.service.price } },
    }),
    this.prisma.reservation.delete({
      where: { id: reservationId },
    }),
  ]);

  return { message: 'Reserva cancelada e saldo reembolsado.' };
}

}
