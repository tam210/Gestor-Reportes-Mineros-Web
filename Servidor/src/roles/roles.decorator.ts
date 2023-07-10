import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: number[]) => SetMetadata('roles', roles);

export enum RolUsuario {
    Usuario = 1,
    Administrador = 0
  }
  