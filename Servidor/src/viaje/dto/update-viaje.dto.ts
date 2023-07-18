import { PartialType } from '@nestjs/mapped-types';
import { CreateViajeDto } from './create-viaje.dto';

export interface UpdateViajeDto {
    // idviaje: number,
    // idorigen: number,
    // idflota: number,
    // tonelaje: number,
    // fechaInicio: Date,
    // fechaFin: Date,
    // //idzona y idflota
    idorigen: number;

    idflota: number;
    idzona?: number;  // nueva propiedad
    tonelaje: number;
    fechaInicio: Date;  
    fechaFin: Date;
}



