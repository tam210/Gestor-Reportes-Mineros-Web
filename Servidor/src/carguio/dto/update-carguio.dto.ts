import { PartialType } from '@nestjs/mapped-types';
import { CreateCarguioDto } from './create-carguio.dto';

export class UpdateCarguioDto extends PartialType(CreateCarguioDto) {}
