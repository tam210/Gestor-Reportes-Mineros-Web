import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import internal from 'stream';

//Implementa parcialmente el dto de crear
//Esto, porque puede actualizar ALGUNOS
//campos del usuario, no todos
export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    id: string
    estadoText?: string
    estado?: number

}
