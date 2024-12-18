import { Controller, Get, Param } from '@nestjs/common';
import { FlotaService } from './flota.service';
import { PuntosFlotaMunicipalRecargaVehiculosElectricos } from './entities/flota-municipal';

@Controller('flota')
export class FlotaController {
  constructor(private readonly flotaService: FlotaService) {}

  @Get()
  findAll(): Promise<PuntosFlotaMunicipalRecargaVehiculosElectricos[]> {
    return this.flotaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flotaService.findOne(+id);
  }
}
