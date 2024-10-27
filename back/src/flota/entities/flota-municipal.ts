import { Entity, PrimaryGeneratedColumn, Column, Generated } from 'typeorm';
import { Geometry } from 'geojson';

@Entity('puntos_flota_municipal_recarga_vehiculos_electricos')
export class PuntosFlotaMunicipalRecargaVehiculosElectricos {
  @PrimaryGeneratedColumn()
  ogc_fid: number;

  @Column()
  @Generated('increment')
  id: number;

  @Column('numeric', { nullable: true })
  point_x: number;

  @Column('numeric', { nullable: true })
  point_y: number;

  @Column('numeric', { nullable: true })
  suma_conec: number;

  @Column('varchar', { length: 255, nullable: true })
  edificio: string;

  @Column('varchar', { length: 255, nullable: true })
  ubicacion_: string;

  @Column('geometry', { nullable: true })
  wkb_geometry: Geometry;
}
