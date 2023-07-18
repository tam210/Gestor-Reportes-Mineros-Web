import { PartialType } from '@nestjs/mapped-types';
import { CreateViajeDto } from './create-viaje.dto';

export interface UpdateViajeDto {
    idviaje: number,
    fecha: number,
    idorigen: number,
    idflota: number,
    tonelaje: number
}



