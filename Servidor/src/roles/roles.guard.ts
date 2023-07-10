import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<number[]>('roles', context.getHandler());
    console.log("Entrando a ver si se requieren roles");

    if (!requiredRoles) {
      return true; // No se han definido roles requeridos, permitir acceso
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');
    const decoded = this.jwtService.decode(token);
    console.log(token);
    // Verifica que el token sea válido y que tenga el tipo de usuario en el payload
    if (!decoded || !decoded['tipousuario']) {
      return false;
    }

    const tipoUsuario = decoded['tipousuario'];

    const hasRequiredRoles = requiredRoles.some((role) => role === tipoUsuario);
    return hasRequiredRoles;
  }
}
