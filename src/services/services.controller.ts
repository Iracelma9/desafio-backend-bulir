import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';


interface AuthenticatedRequest extends Request {
    user?: { id: string };
  }

@Controller('services')

export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto, @Req() req: Request) {
    console.log('Usuário autenticado:', req.user); 
    const providerId = req.user?.['id']; 
    return this.servicesService.create(createServiceDto, providerId);
  }

  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }
}
