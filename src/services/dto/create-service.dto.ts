import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  price: number;
}
