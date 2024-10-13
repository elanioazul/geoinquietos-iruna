import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import Feature from 'ol/Feature';
import * as olCoordinate from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile.js';
@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss']
})
export class VisorComponent implements AfterViewInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  public map!: Map;

  constructor() {}


  ngAfterViewInit(): void {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
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
