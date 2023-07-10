import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);

export enum RolUsuario {
    Usuario = 0,
    Administrador = 1
  }
  