import { Component, NgZone, Testability } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { LoadingController, Item } from 'ionic-angular';
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
          console.log(dis);
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

              this.calculateDistance(this.start.lat,bVicLatLng.lat,this.start.lng,bVicLatLng.lng);
              console.log('Vic');
              this.calculateDistance(this.start.lat,bPhaLatLng.lat,this.start.lng,bPhaLatLng.lng);
              console.log('Pha');
              this.calculateDistance(this.start.lat,bRatLatLng.lat,this.start.lng,bRatLatLng.lng);
              console.log('bRat');
              this.calculateDistance(this.start.lat,bSiaLatLng.lat,this.start.lng,bSiaLatLng.lng);
              console.log('Sia');
              this.calculateDistance(this.start.lat,bChiLatLng.lat,this.start.lng,bChiLatLng.lng);
              console.log('Chi');
              this.calculateDistance(this.start.lat,bPhlLatLng.lat,this.start.lng,bPhlLatLng.lng);
              console.log('Phl');
              this.calculateDistance(this.start.lat,bNanLatLng.lat,this.start.lng,bNanLatLng.lng);
              console.log('Nan');
              this.calculateDistance(this.start.lat,bAsoLatLng.lat,this.start.lng,bAsoLatLng.lng);
              console.log('Aso');
              this.calculateDistance(this.start.lat,mRamLatLng.lat,this.start.lng,mRamLatLng.lng);
              console.log('mRam');
              this.calculateDistance(this.start.lat,mPheLatLng.lat,this.start.lng,mPheLatLng.lng);
              console.log('mPhe');
              this.calculateDistance(this.start.lat,mSukLatLng.lat,this.start.lng,mSukLatLng.lng);
              console.log('Suk');
              this.calculateDistance(this.start.lat,aPhaLatLng.lat,this.start.lng,aPhaLatLng.lng);
              console.log('aPha');
              this.calculateDistance(this.start.lat,aRatLatLng.lat,this.start.lng,aRatLatLng.lng);
              console.log('aRat');
              this.calculateDistance(this.start.lat,aMukLatLng.lat,this.start.lng,aMukLatLng.lng);
              console.log('aMuk');
//เหลือแก้ latlng ในเบสเอาตัวแปรมาเก็บก็เสร็จ
              // let CVicLat = latitude - this.Pop[0].lat;
              // let CVicLng = longitude - this.Pop[0].lng;
              // let CPhaLat = latitude - this.Pop[1].lat;
              // let CPhaLng = longitude - this.Pop[1].lng;
              // let CRatLat = latitude - this.Pop[2].lat;
              // let CRatLng = longitude - this.Pop[2].lng;
              // let CSiaLat = latitude - this.Pop[3].lat;
              // let CSiaLng = longitude - this.Pop[3].lng;
              // let CChiLat = latitude - this.Pop[4].lat;
              // let CChiLng = longitude - this.Pop[4].lng;
              // let CPhlLat = latitude - this.Pop[5].lat;
              // let CPhlLng = longitude - this.Pop[5].lng;
              // let CNanLat = latitude - this.Pop[6].lat;
              // let CNanLng = longitude - this.Pop[6].lng;
              // let CAsoLat = latitude - this.Pop[7].lat;
              // let CAsoLng = longitude - this.Pop[7].lng;
              // let CRamLat = latitude - this.Pop[8].lat;
              // let CRamLng = longitude - this.Pop[8].lng;
              // let CPheLat = latitude - this.Pop[9].lat;
              // let CPheLng = longitude - this.Pop[9].lng;
              // let CSukLat = latitude - this.Pop[10].lat;
              // let CSukLng = longitude - this.Pop[10].lng;
              // let CaPhaLat = latitude - this.Pop[11].lat;
              // let CaPhaLng = longitude - this.Pop[11].lng;
              // let CaRatLat = latitude - this.Pop[12].lat;
              // let CaRatLng = longitude - this.Pop[12].lng;
              // let CMukLat = latitude - this.Pop[13].lat;
              // let CMukLng = longitude - this.Pop[13].lng;
        
        
              //   if (CVicLat<0) {
              //   CVicLat = CVicLat*-1;
              // } 
              // // console.log(CVicLat);
              // if (CVicLng<0) {
              //   CVicLng = CVicLng*-1;
              // }
              // // console.log(CVicLng);
              // if (CPhaLat<0) {
              //   CPhaLat = CPhaLat*-1;
              // } 
              // // console.log(CPhaLat);
              // if (CPhaLng<0) {
              //   CPhaLng = CPhaLng*-1;
              // } 
              // // console.log(CPhaLng);
              // if (CRatLat<0) {
              //   CRatLat = CRatLat*-1;
              // }
              // // console.log(CRatLat);
              // if (CRatLng<0) {
              //   CRatLng = CRatLng*-1;
              // }
              // // console.log(CRatLng);
              // if (CSiaLat<0) {
              //   CSiaLat = CSiaLat*-1;
              // }
              // // console.log(CSiaLat);
              // if (CSiaLng<0) {
              //   CSiaLng = CSiaLng*-1;
              // }
              // // console.log(CSiaLng);
              // if (CChiLat<0) {
              //   CChiLat = CChiLat*-1;
              // }
              // // console.log(CChiLat);
              // if (CChiLng<0) {
              //   CChiLng = CChiLng*-1;
              // }
              // // console.log(CChiLng);
              // if (CPhlLat<0) {
              //   CPhlLat = CPhlLat*-1;
              // }
              // // console.log(CPhlLat);
              // if (CPhlLng<0) {
              //   CPhlLng = CPhlLng*-1;
              // }
              // // console.log(CPhlLng);
              // if (CNanLat<0) {
              //   CNanLat = CNanLat*-1;
              // }
              // // console.log(CNanLat);
              // if (CNanLng<0) {
              //   CNanLng = CNanLng*-1;
              // }
              // // console.log(CNanLng);
              // if (CAsoLat<0) {
              //   CAsoLat = CAsoLat*-1;
              // }
              // // console.log(CAsoLat);
              // if (CAsoLng<0) {
              //   CAsoLng = CAsoLng*-1;
              // }
              // // console.log(CAsoLng);
              // if (CRamLat<0) {
              //   CRamLat = CRamLat*-1;
              // }
              // // console.log(CRamLat);
              // if (CRamLng<0) {
              //   CRamLng = CRamLng*-1;
              // }
              // // console.log(CRamLng);
              // if (CPheLat<0) {
              //   CPheLat = CPheLat*-1;
              // }
              // // console.log(CPheLat);
              // if (CPheLng<0) {
              //   CPheLng = CPheLng*-1;
              // }
              // // console.log(CPheLng);
              // if (CSukLat<0) {
              //   CSukLat = CSukLat*-1;
              // }
              // // console.log(CSukLat);
              // if (CSukLng<0) {
              //   CSukLng = CSukLng*-1;
              // }
              // // console.log(CSukLng);
              // if (CaPhaLat<0) {
              //   CaPhaLat = CaPhaLat*-1;
              // }
              // // console.log(CaPhaLat);
              // if (CaPhaLng<0) {
              //   CaPhaLng = CaPhaLng*-1;
              // }
              // // console.log(CaPhaLng);
              // if (CaRatLat<0) {
              //   CaRatLat = CaRatLat*-1;
              // }
              // // console.log(CaRatLat);
              // if (CaRatLng<0) {
              //   CaRatLng = CaRatLng*-1;
              // }
              // // console.log(CaRatLng);
              // if (CMukLat<0) {
              //   CMukLat = CMukLat*-1;
              // }
              // // console.log(CMukLat);
              // if (CMukLng<0) {
              //   CMukLng = CMukLng*-1;
              // }
              // // console.log(CMukLng);
      
      
              // if ((CPhaLat>CVicLat)&&(CPhaLng>CVicLng)) {
              //   this.end = bVicLatLng;
              //   console.log('Vic Closer') ; 
              // } else if ((CRatLat>CPhaLat)&&(CRatLng>CPhaLat)) {
              //   this.end = bPhaLatLng;
              //   console.log('Pha Closer') ;         
              // } else if ((CSiaLat>CRatLat)&&(CSiaLng>CRatLng)) {
              //   this.end = bRatLatLng;
              // } else if((CChiLat>CSiaLat)&&(CChiLng>CSiaLng)){
              //   this.end = bSiaLatLng;
              // } else if((CPhlLat>CChiLat)&&(CPhlLng>CChiLng)){
              //   this.end = bChiLatLng;
              // } else if((CNanLat>CPhlLat)&&(CNanLng>CPhlLng)){
              //   this.end = bPhlLatLng;
              // } else if((CAsoLat>CNanLat)&&(CAsoLng>CNanLng)){
              //   this.end = bNanLatLng;
              // } else if((CRamLat>CAsoLat)&&(CRamLng>CAsoLng)){
              //   this.end = bAsoLatLng;
              // } else if((CPheLat>CRamLat)&&(CPheLng>CRamLng)){
              //   this.end = mRamLatLng;
              // } else if((CSukLat>CPheLat)&&(CSukLng>CPheLng)){
              //   this.end = mPheLatLng;
              // } else if((CaPhaLat>CSukLat)&&(CaPhaLng>CSukLng)){
              //   this.end = mSukLatLng;
              // } else if((CaRatLat>CaPhaLat)&&(CaRatLng>CaPhaLng)){
              //   this.end = aPhaLatLng;
              // } else if((CMukLat>CaRatLat)&&(CMukLng>CaRatLng)){
              //   this.end = aRatLatLng;
              // } else{
              //   this.end = aMukLatLng;
              // }

              


          // 
  
          // console.log(bVicLatLng);
  
          // let bVicMark = new google.maps.Marker({
          //   position : bVicLatLng,          
          //   map: this.map,
          //   title: 'Victory Monument' 
          // });
          // let bPhaMark = new google.maps.Marker({
          //   position : bPhaLatLng,          
          //   map: this.map,
          //   title: 'Phaya Thai' 
          // });
          // let bRatMark = new google.maps.Marker({
          //   position : bRatLatLng,          
          //   map: this.map,
          //   title: 'Ratchathewi' 
          // });
          // let bSiaMark = new google.maps.Marker({
          //   position : bSiaLatLng,          
          //   map: this.map,
          //   title: 'Siam' 
          // });
          // let bChiMark = new google.maps.Marker({
          //   position : bChiLatLng,          
          //   map: this.map,
          //   title: 'Chidlom' 
          // });
          // let bPhlMark = new google.maps.Marker({
          //   position : bPhlLatLng,          
          //   map: this.map,
          //   title: 'Phloen Chit' 
          // });
          // let bNanMark = new google.maps.Marker({
          //   position : bNanLatLng,          
          //   map: this.map,
          //   title: 'Nana' 
          // });
          // let bAsoMark = new google.maps.Marker({
          //   position : bAsoLatLng,          
          //   map: this.map,
          //   title: 'Asok' 
          // });
          // let mRamMark = new google.maps.Marker({
          //   position : mRamLatLng,          
          //   map: this.map,
          //   title: 'Victory Monument' 
          // });
          // let  mPheMark = new google.maps.Marker({
          //   position :  mPheLatLng,          
          //   map: this.map,
          //   title: 'Phetchaburi' 
          // });
          // let mSukMark = new google.maps.Marker({
          //   position : mSukLatLng,          
          //   map: this.map,
          //   title: 'Sukumvit' 
          // });
          // let aPhaMark = new google.maps.Marker({
          //   position : aPhaLatLng,          
          //   map: this.map,
          //   title: 'Phyathai' 
          // });
          // let aRatMark = new google.maps.Marker({
          //   position :  aRatLatLng,          
          //   map: this.map,
          //   title: 'Ratchaprarop' 
          // });
          // let  aMukMark = new google.maps.Marker({
          //   position : aMukLatLng,          
          //   map: this.map,
          //   title: 'Mukason' 
          // });


          

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
