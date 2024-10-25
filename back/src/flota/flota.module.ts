import { Module } from '@nestjs/common';
import { FlotaService } from './flota.service';
import { FlotaController } from './flota.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuntosFlotaMunicipalRecargaVehiculosElectricos } from './entities/flota-municipal';

@Module({
  imports: [
    TypeOrmModule.forFeature([PuntosFlotaMunicipalRecargaVehiculosElectricos]),
  ],
  providers: [FlotaService],
  controllers: [FlotaController],
})
export class FlotaModule {}
