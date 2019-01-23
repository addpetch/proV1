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
import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
// import { FirebaseService } from './../providers/firebase-service/firebase-service';

const firebaseConfig = {
  apiKey: "AIzaSyA_jE3HrBBZCcEXua-Bbbgorv_d7IvL0xw",
  authDomain: "e-train-1537891299197.firebaseapp.com",
  databaseURL: "https://e-train-1537891299197.firebaseio.com",
  projectId: "e-train-1537891299197",
  storageBucket: "e-train-1537891299197.appspot.com",
  messagingSenderId: "512180303029",
};

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    TabsNavigationPage,
    PlacesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
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
    FirebaseServiceProvider,
    // FirebaseService,
  ]
})
export class AppModule {}
