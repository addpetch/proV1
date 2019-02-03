import { Component, NgZone } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LoadingController, Item } from 'ionic-angular';
//import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';

declare var google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: any;
  markers: any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;
  loading: any;
  Destination: any ='';
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  start: any; end: any;
  site = {
    Lat : '13.7501304',
    Lng: '100.5213145'
  };
  Pop: any;

  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase
    
  ) {
  //  this.db.list('site').push(this.site);
  //  this.db.list('site').valueChanges().subscribe(
  //    data =>{
  //      console.log(data)
  //      this.Pop = data;
  //    }
  //  ) ;
    
    this.start = new google.maps.LatLng(13.8262621, 100.5147228);
    this.end = new google.maps.LatLng(13.7591387, 100.566437);
    this.geocoder = new google.maps.Geocoder;
    let elem = document.createElement("div")
    this.GooglePlaces = new google.maps.places.PlacesService(elem);
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = {
      input: ''
    }
    
    this.autocompleteItems = [];
    this.markers = [];
    this.loading = this.loadingCtrl.create();
    // this.Pop = 'Popppp';
  }



  ionViewDidEnter(){
    this.getPosition();
    this.getDataFromFirebase();
  }

  getDataFromFirebase(){
    this.db.list('/Station/').valueChanges().subscribe(
      data => {
        console.log(JSON.stringify(data))
        this.Pop = data;
      }
      ,(err)=>{
        console.log("probleme : ", err)
     });
    }

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // console.log(latitude, longitude);
    
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');
  
    // create LatLng object
    let myLatLng = {lat: latitude, lng: longitude};
    this.start = myLatLng;
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
  
   google.maps.event.addListenerOnce(this.map, 'idle', () => {
    let marker = new google.maps.Marker({
      position: myLatLng,
        map: this.map,
        title: 'AQUI ESTOY!'
      });
      mapEle.classList.add('show-map');
    });
    
    
  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if(predictions){
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
    });
  }

  selectSearchResult(item):any{
    this.clearMarkers();
    this.autocompleteItems = [];
    
    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){
        // let position = {
        //     lat: results[0].geometry.location.lat,
        //     lng: results[0].geometry.location.lng
        // };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        console.log(this.end);
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
        // this.end = results[0].geometry.location;
      }
      
    })
    
    //test direction
    this.directionsDisplay.setMap(this.map);
    this.directionsService.route({
    origin:  this.start,
    destination: this.end,
    travelMode: 'DRIVING'},
    (response, status) => {
    if (status === 'OK') {
    this.directionsDisplay.setDirections(response);
    } else {
    window.alert('Directions request failed due to ' + status);
    }
    });
    
  }

  clearMarkers(){
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i])
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  calculateAndDisplayRoute() {
    let directionService = new google.maps.DirectionsService;
    let directionDisplay = new google.maps.DirectionsRenderer;
    const map = new google.maps.Map(document.getElementById('map'),{
      zoom: 7,
      center: {lat: 41.85,lng: -87.65}
    });
    directionDisplay.setMap(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat : position.coords.latitude,
          lng : position.coords.longitude,
        } ;
        map.setCenter(pos);
      }, function(){

      });
    } else {
       
    }
  
    directionService.route({
      origin: '',
      destination: '',
      travelMode: 'DRIVING'
    }, function(response, status){
      if(status == 'OK') {
        directionDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    })
  }

  
}
