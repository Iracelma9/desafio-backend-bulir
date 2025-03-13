import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log(' Token Recebido:', request.headers.authorization); // 🔥 Depuração

    if (!request.headers.authorization) {
      throw new UnauthorizedException('Token ausente no cabeçalho');
    }

    return super.canActivate(context);
  }
}
