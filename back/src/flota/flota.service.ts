import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PuntosFlotaMunicipalRecargaVehiculosElectricos } from './entities/flota-municipal';

@Injectable()
export class FlotaService {
  constructor(
    @InjectRepository(PuntosFlotaMunicipalRecargaVehiculosElectricos)
    private readonly flotaRepository: Repository<PuntosFlotaMunicipalRecargaVehiculosElectricos>,
  ) {}

  findAll(): Promise<PuntosFlotaMunicipalRecargaVehiculosElectricos[]> {
    return this.flotaRepository.find();
  }
}
