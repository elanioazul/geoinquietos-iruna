import { Module } from '@nestjs/common';
import { FlotaService } from './flota.service';
import { FlotaController } from './flota.controller';

@Module({
  providers: [FlotaService],
  controllers: [FlotaController]
})
export class FlotaModule {}
