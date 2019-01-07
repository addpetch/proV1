import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SplashScreen} from "@ionic-native/splash-screen";
import { StatusBar} from "@ionic-native/status-bar";
import { Geolocation } from '@ionic-native/geolocation';
import { BrowserModule } from '@angular/platform-browser';

import { MapPage } from '../pages/map/map';
import { TabsNavigationPage } from '../pages/tabs-navigation/tabs-navigation';
import { PlacesPage } from '../pages/places/places';

import { LocationSelect } from '../pages/location-select/location-select/LocationSelect';
import { Connectivity } from '../providers/connectivity-service';
import { GoogleMaps } from '../providers/google-maps/google-maps';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    TabsNavigationPage,
    PlacesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    TabsNavigationPage,
    PlacesPage
  ],
  providers: [
    StatusBar,
    Connectivity,
    GoogleMaps,
    SplashScreen,
    Geolocation,
    Network,
  ]
})
export class AppModule {}
