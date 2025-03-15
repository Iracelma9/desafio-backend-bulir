import { Controller, Get, Post, Patch, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Request } from 'express';


interface AuthenticatedRequest extends Request {
    user?: { id: string };
  }

@Controller('services')

export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('PROVIDER')
  @Post()
  async create(@Body() createServiceDto: CreateServiceDto, @Req() req: Request) {
    console.log('Usuário autenticado:', req.user); 
    const providerId = req.user?.['id']; 
    return this.servicesService.create(createServiceDto, providerId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles('PROVIDER')
  @Patch(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateData: { name?: string; description?: string; price?: number },
    @Req() req: Request
  ) {
    const providerId = req.user?.['id'];
  
    console.log('Métodos disponíveis no ServicesService:', Object.keys(this.servicesService));
  
    return this.servicesService.update(id, providerId, updateData);
  }
  
}
