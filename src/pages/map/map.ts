import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http } from '@angular/http';
import 'rxjs/add/operator/map';

import L from "leaflet";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  propertyList = [];
  center: L.PointTuple;
  map;

  constructor(public navCtrl: NavController, private http: Http) {
    
  }

  ionViewDidLoad() {
    console.log("On load"); 
    //The center of the map and initial zoom (Refeitório de Santiago)
    this.map = L.map('mapId').setView([40.629752, -8.6598418], 13);
    
    //The "style" of the map 
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoidmlzYyIsImEiOiJjamJqY215aDMzMTJyMnd1cDlzNTEyanFrIn0._n73qdzmvIomtzIkfzOHvA'
    }).addTo(this.map);
  
    console.log("Map is ready"); 
    this.retrievePoints(); 

  }

  //To load the locations of the canteens. They are physical places so this data is completely 
  //Static
  retrievePoints(){
    this.http.get('assets/data/points.json')
    .map(res => res.json())
    .subscribe(data => {
        this.propertyList = data.properties;
    },
    err => console.log("error is "+err), // error
      () => this.leafletMap()
    );
  }

  //We will populate the map with markers
  leafletMap(){
    console.log("property " + this.propertyList.length);
    for (let property of this.propertyList) {
      L.marker([property.lat, property.long]).addTo(this.map)
      .bindPopup(property.city)
      .openPopup();
    }
    
  }

}