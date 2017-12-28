import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map'
import { Storage } from '@ionic/storage';
import { CantineMainPage } from '../cantine-main/cantine-main';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private notes: Object[];
  constructor(public navCtrl: NavController, private storage: Storage) {
    
  }

  ionViewWillEnter () {
    console.log("Will enter ...");
    this.storage.get('todoList').then((notes) => {
      this.notes = notes;
    });
  }

  goToMap() {
    console.log("Going to map"); 
    this.navCtrl.push(MapPage); 
  }

  /* Navigation methods for the 3 types of cantines
  Depending on the one the user choses, we pass different parameters */ 

  loadCantineSantiago() {
    this.navCtrl.push(CantineMainPage, { cantine: 'Santiago'});
  }

  loadCantineCrasto() {
    this.navCtrl.push(CantineMainPage, { cantine: 'Crasto'});
  }

  loadCantineBar() {
    this.navCtrl.push(CantineMainPage, { cantine: 'Snack-bar'});
  }

}
