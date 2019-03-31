import { Component, NgZone } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';

@Component({
  selector: 'places-map',
  templateUrl: 'places.html'
})
export class PlacesPage {
 

  constructor(public navCtrl: NavController) {
  }

}
