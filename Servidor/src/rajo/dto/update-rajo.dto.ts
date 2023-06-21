import { PartialType } from '@nestjs/mapped-types';
import { CreateRajoDto } from './create-rajo.dto';

export class UpdateRajoDto extends PartialType(CreateRajoDto) {}
