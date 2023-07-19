import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { RolUsuario, Roles } from 'src/roles/roles.decorator';

@Controller('reporte')

export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Post()
  create(@Body() createReporteDto: CreateReporteDto) {
    return this.reporteService.create(createReporteDto);
  }

  @Get()
  async obtenerPorFiltro(@Query('nombre') nombre?: string, @Query('fechaInicio') fechaInicio?: Date, @Query('fechaFin') fechaFin?: Date) {
    const reportes = await this.reporteService.obtenerPorNombreRajoFecha(nombre, fechaInicio, fechaFin);
    return reportes;
  }

  // @Get()
  // findAll() {
  //   return this.reporteService.findAll();
  // }

  @Get(':rajonombre')
  async obtenerPorRajoNombre(@Param('rajonombre') rajonombre: string) {
    return this.reporteService.obtenerPorRajoNombre(rajonombre);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.reporteService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReporteDto: UpdateReporteDto) {
    return this.reporteService.update(+id, updateReporteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reporteService.remove(+id);
  }
}
