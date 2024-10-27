import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import Feature from 'ol/Feature';
import * as olCoordinate from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile.js';
import { Geometry, Point } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import * as olLoadingstrategy from 'ol/loadingstrategy';
import { Cluster } from 'ol/source';
import Style from 'ol/style/Style';
import { environment } from 'src/environments/environment';
import Icon from 'ol/style/Icon';
import { RealTimeService } from '../core/services/real-time.service';
import { catchError, map, tap } from 'rxjs';
import { RealTimeSocketIoService } from '../core/services/real-time-socket-io.service';
import { Message } from '../interfaces/message';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss']
})
export class VisorComponent implements AfterViewInit {

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  public map!: Map;

  pointsNoClusterLyr!: VectorLayer<VectorSource<Feature<Geometry>>>;
  //pointsClusterLyr!: VectorLayer<VectorSource<Feature<Geometry>>>;

  iconStyle = new Style({
    image: new Icon({
      anchor: [0.5, 12],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: '../../assets/pin.png',
    }),
  });

  finalUrlParams = [
    'SERVICE=WFS',
    `VERSION=1.0.0`,
    'REQUEST=GetFeature',
    `typeName=geoinquietos:puntos_flota_municipal_recarga_vehiculos_electricos`,
    //`bbox=${this.options.extent}`,
    `EPSG=4326`,
    `OUTPUTFORMAT=application/json`,
  ];

  lyrSource = new VectorSource({
    // url: (extent) => {
    //   return this.geoserverPath.concat(this.finalUrlParams.join('&')).concat(`&bbox=` + extent)
    // },
    url: environment.basePathGeoserver.concat(this.finalUrlParams.join('&')),
    format: new GeoJSON(),
    strategy: olLoadingstrategy.all
  });

  clusterSource = new Cluster({
    distance: 35,
    source: this.lyrSource,
  });

  // constructor(private realTimeService: RealTimeService) {
  //   this.realTimeService.messages$.pipe(
  //     map(data => console.log(data)),
  //     catchError(error => {throw error}),
  //     tap({
  //       error: error => console.log('[Live component] Error: ',
  //         error),
  //       complete: () => console.log('[Live component] Connection closed')
  //     })
  //   )
  // }
  constructor(private realTimeServiceSocketIo: RealTimeSocketIoService) {}


  ngAfterViewInit(): void {
    this.pointsNoClusterLyr = new VectorLayer({
      className: 'no-cluster',
      source: this.lyrSource,
      visible: true,
      opacity: 1,
      style: this.iconStyle
    })
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        this.pointsNoClusterLyr
      ],
      target: this.mapElement.nativeElement,
      view: new View({
        projection: 'EPSG:4326',
        center: [-3.664411, 40.432867],
        zoom: 13
      }),
      controls: [],
    });
    this.realTimeServiceSocketIo.onMessage().subscribe((data: Message) => {
      this.updateFeature(data)
    })
  }

  private updateFeature(data: Message): void {
    const found = this.pointsNoClusterLyr.getSource()?.getFeatures().find((feat: Feature) => feat.get('id') === data.id);
    if (found) {
      (found.getGeometry() as Point).setCoordinates([data.lon, data.lat])
    }
  }
}
