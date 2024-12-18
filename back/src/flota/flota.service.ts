import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Geometry, Repository } from 'typeorm';
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
  findOne(id: number) {
    return this.flotaRepository.findOneBy({
      id: id,
    });
  }

  async updateLocation(id: number, lon: number, lat: number): Promise<void> {
    const found = await this.flotaRepository.findOne({ where: { id: id } });
    if (found) {
      found.wkb_geometry = {
        type: 'Point',
        coordinates: [lon, lat],
      } as unknown as Geometry;
      await this.flotaRepository.save(found);
    }
  }
}
