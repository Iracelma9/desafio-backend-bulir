import {Controller, Get, Post, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { Request } from 'express';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createReservationDto: CreateReservationDto, @Req() req: Request) {
    const clientId = req.user?.['id'];
    return this.reservationsService.create(createReservationDto, clientId);
  }

  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async cancel(@Param('id') id: string, @Req() req: Request) {
    const clientId = req.user?.['id'];
    return this.reservationsService.cancelReservation(id, clientId);
  }
}
