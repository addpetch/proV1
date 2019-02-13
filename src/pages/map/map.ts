import { Component, NgZone, Testability } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LoadingController, Item, Chip } from 'ionic-angular';
//import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { AngularFireDatabase } from 'angularfire2/database';
import { database } from 'firebase';

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
  kartoon: any;
  item: any;
  // stLatLng: string;
  
  constructor(
    public zone: NgZone,
    public geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public db: AngularFireDatabase, 
    
    
    ) {
      // test push data
      //  this.db.list('site').push(this.site);
      //  this.db.list('site').valueChanges().subscribe(
        //    data =>{
          //      console.log(data)
          //      this.Pop = data;
          //    }
          //  ) ;
      // endtest
          
          this.start = new google.maps.LatLng(13.8262621, 100.5147228);
          this.end = new google.maps.LatLng(13.7627997,100.5348922);
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
        }
        
        
        
        ionViewDidEnter(){
          this.getPosition();
          
          // this.getDataFromFirebase();
          
        } 

        calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
          let p = 0.017453292519943295;    // Math.PI / 180
          let c = Math.cos;
          let a = 0.5 - c((lat1-lat2) * p) / 2 + c(lat2 * p) *c((lat1) * p) * (1 - c(((long1- long2) * p))) / 2;
          let dis = (12742 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
          // console.log(dis);
          return dis;
        }

        getDataFromFirebase(){return new Promise((resolve, reject) => {
          this.db.list('/Station/').valueChanges()
          .subscribe(
            data => {
              this.Pop = data;
              resolve(this.Pop)  
            },
            );
          });
        }
        
        // old getdata fn
        // getDataFromFirebase(){
          //    this.db.list('/Station/1001').valueChanges().subscribe(
            //      data => {
              //       // console.log(JSON.stringify(data));
              //       this.Pop = data as any;
              //       // console.log(this.Pop);
              //       this.stLat = this.Pop as any[1];
              //       // this.stLng = this.Pop[2];
              //       return this.stLat
              //     }
              //     )
              //     console.log(this.stLat)
              //     }
              
              
              getPosition():any{
                this.geolocation.getCurrentPosition().then(response => {
                  this.loadMap(response);
                })
                .catch(error =>{
                  console.log(error);
                })
              }

              // getData(){
              //   this.getDataFromFirebase().then(data =>{
              //     //  item = data as any;
              //     this.Pop = data as any;
              //     this.stLat = this.Pop[0].Lat;
              //     console.log(this.stLat)  ;

              //   })
              // }

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
           
            this.getDataFromFirebase().then(data =>{
              //  item = data as any;
              this.Pop = data as any;
              
              console.log(this.Pop);
               
              let marker1  = new google.maps.Marker({
                    position: myLatLng,
                      map: this.map,
                      title: 'AQUI ESTOY!'
                    });
                //  this.db.list('/Station/1001').valueChanges().subscribe(
                  //  data => {
                    //   console.log(JSON.stringify(data));
                    //   this.Pop = data;
                    //   console.log(this.Pop);
                    //   this.stLat = this.Pop[1];
                    //   this.stLng = this.Pop[2];
                    // this.getData(); 

              let bVicLatLng = {lat: this.Pop[0].lat, lng: this.Pop[0].lng};
              let bPhaLatLng = {lat: this.Pop[1].lat, lng: this.Pop[1].lng};
              let bRatLatLng = {lat: this.Pop[2].lat, lng: this.Pop[2].lng};
              let bSiaLatLng = {lat: this.Pop[3].lat, lng: this.Pop[3].lng};
              let bChiLatLng = {lat: this.Pop[4].lat, lng: this.Pop[4].lng};
              let bPhlLatLng = {lat: this.Pop[5].lat, lng: this.Pop[5].lng};
              let bNanLatLng = {lat: this.Pop[6].lat, lng: this.Pop[6].lng};
              let bAsoLatLng = {lat: this.Pop[7].lat, lng: this.Pop[7].lng};
              let mRamLatLng = {lat: this.Pop[8].lat, lng: this.Pop[8].lng};
              let mPheLatLng = {lat: this.Pop[9].lat, lng: this.Pop[9].lng};
              let mSukLatLng = {lat: this.Pop[10].lat, lng: this.Pop[10].lng};
              let aPhaLatLng = {lat: this.Pop[11].lat, lng: this.Pop[11].lng};
              let aRatLatLng = {lat: this.Pop[12].lat, lng: this.Pop[12].lng};
              let aMukLatLng = {lat: this.Pop[13].lat, lng: this.Pop[13].lng};


              // test compare Locate
              let compare = [
                this.calculateDistance(this.start.lat,bVicLatLng.lat,this.start.lng,bVicLatLng.lng),
                this.calculateDistance(this.start.lat,bPhaLatLng.lat,this.start.lng,bPhaLatLng.lng),
                this.calculateDistance(this.start.lat,bRatLatLng.lat,this.start.lng,bRatLatLng.lng),
                this.calculateDistance(this.start.lat,bSiaLatLng.lat,this.start.lng,bSiaLatLng.lng),
                this.calculateDistance(this.start.lat,bChiLatLng.lat,this.start.lng,bChiLatLng.lng),
                this.calculateDistance(this.start.lat,bPhlLatLng.lat,this.start.lng,bPhlLatLng.lng),
                this.calculateDistance(this.start.lat,bNanLatLng.lat,this.start.lng,bNanLatLng.lng),
                this.calculateDistance(this.start.lat,bAsoLatLng.lat,this.start.lng,bAsoLatLng.lng),
                this.calculateDistance(this.start.lat,mRamLatLng.lat,this.start.lng,mRamLatLng.lng),
                this.calculateDistance(this.start.lat,mPheLatLng.lat,this.start.lng,mPheLatLng.lng),
                this.calculateDistance(this.start.lat,mSukLatLng.lat,this.start.lng,mSukLatLng.lng),
                this.calculateDistance(this.start.lat,aPhaLatLng.lat,this.start.lng,aPhaLatLng.lng),
                this.calculateDistance(this.start.lat,aRatLatLng.lat,this.start.lng,aRatLatLng.lng),
                this.calculateDistance(this.start.lat,aMukLatLng.lat,this.start.lng,aMukLatLng.lng),
              ]
              let countconpare = 0;
              for (let index = 0; index < 14; index++) {
                let compo = compare[index];
                countconpare = 0;
                for (let index1 = 0; index1 < 14; index1++) {
                   if (compo<compare[index1]) {
                    countconpare++;
                  }
                  if (countconpare == 13){
                    this.end = {lat: this.Pop[index].lat,lng: this.Pop[index].lng};
                    console.log(this.end);
                  }
                }
              }
          mapEle.classList.add('show-map');
        });
      })
      // });
      
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
        this.clearMarkers();
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
    travelMode: 'DRIVING',},
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
