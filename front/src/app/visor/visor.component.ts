import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import Feature from 'ol/Feature';
import * as olCoordinate from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile.js';
import { Geometry } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';
import * as olLoadingstrategy from 'ol/loadingstrategy';
import { Cluster } from 'ol/source';
import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
import CircleStyle from 'ol/style/Circle.js';
@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss']
})
export class VisorComponent implements AfterViewInit {

  geoserverPath = '/geoserver/ows?';

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  public map!: Map;

  pointsNoClusterLyr!: VectorLayer<VectorSource<Feature<Geometry>>>;
  //pointsClusterLyr!: VectorLayer<VectorSource<Feature<Geometry>>>;

  pointStyle = new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: 'purple'
      })
    })
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
    url: this.geoserverPath.concat(this.finalUrlParams.join('&')),
    format: new GeoJSON(),
    strategy: olLoadingstrategy.all
  });

  clusterSource = new Cluster({
    distance: 35,
    source: this.lyrSource,
  });

  constructor() {}


  ngAfterViewInit(): void {
    this.pointsNoClusterLyr = new VectorLayer({
      className: 'no-cluster',
      source: this.lyrSource,
      visible: true,
      opacity: 1,
      style: this.pointStyle
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
  }
}
