import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
 import { PrismaService } from 'src/prisma/prisma.service';
 import { CreateServiceDto } from './dto/create-service.dto';


@Injectable()
export class ServicesService {
    constructor(private readonly prisma: PrismaService){}

    async create(createServiceDto: CreateServiceDto, providerId: string){

    const provider= await this.prisma.user.findUnique({

        where: {id : providerId},
    });
    if (!provider){
        throw new BadRequestException('Usuario não encontrado');

    }

    if (provider.role !== 'PROVIDER'){
        throw new ForbiddenException('Apenas prestadores de serviço podem cadastrar serviços')
    }

    return this.prisma.service.create({
        data: {
        name: createServiceDto.name,
        description:createServiceDto.description,
        price: createServiceDto.price,
        providerId,
    },

    });
}


async findAll (){
    return this.prisma.service.findMany({
        include: {provider : {select:{ name: true, email: true}}}
    });
}
}
