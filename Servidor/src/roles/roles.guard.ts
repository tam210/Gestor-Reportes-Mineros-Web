import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';
import { decode } from 'punycode';
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

    // Verifica que el token sea válido y que tenga el tipo de usuario en el payload
    if (!decoded || !decoded.hasOwnProperty('tipousuario')) {
      console.log("El payload no es válido (no existe tipousuario)");
      return false;
    }

    const tipoUsuario = decoded['tipousuario'];

    const hasRequiredRoles = requiredRoles.some((role) => role === tipoUsuario);
    console.log("---------",hasRequiredRoles);
    return hasRequiredRoles;
  }
}
