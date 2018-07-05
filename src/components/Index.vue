<template>
  <div class="container" style="padding-top: 15px; padding-bottom: 15px">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">PUBLIC HEALTH SERVICE</div>
          <div class="panel-body">
            <div class="col-md-12" style="padding-left: 0px !important; padding-right: 0px !important">
              <div class="col-md-6">
                <div class="form-group form-float">
                  <!-- {{selectedEvent}} -->
                    <vue-instant
                      :suggestion-attribute="suggestionAttribute" 
                      v-model="searchValue" 
                      :disabled="false"  
                      @input="changed" 
                      :suggestOnAllWords="true" 
                      @enter="setMedicals(searchValue)" 
                      :show-autocomplete="true" 
                      :autofocus="true" 
                      :suggestions="suggestions" 
                      name="medical-search" 
                      placeholder="Cari Layanan Kesehatan" 
                      type="google">
                    </vue-instant>  
                    <!-- <pre>{{suggestions}}</pre> -->
                    <!-- <div class="form-group">
                      <gmap-autocomplete
                        class="form-control"
                        @place_changed="setPlace">
                      </gmap-autocomplete>
                    </div>
                  </div>
                  <div class="form-group">
                      <button
                        style="padding:0px !important; margin:0px !important"
                        class="btn btn-primary"
                        @click="addMarker">
                        FIND
                      </button> -->
                </div>
              </div>
              <div class="col-md-6">
              
              </div>
            </div>
            <div class="col-md-12">
              <div class="panel panel-default">
                <div class="panel-body">
                    <label class="kabupaten checkbox-inline" v-for="(kabupaten,index) in kabupatens" v-bind:key="index" v-bind:style="{background:kabupaten.color,color:kabupaten.fontColor}">
                        <img v-bind:src="kabupaten.logo" :alt="kabupaten.nama" style="width: 20px !important; height: 20px !important; margin-right: 20px">
                      <input v-on:change="setMedicals()" v-model="checkedMedical" type="checkbox" v-bind:value="kabupaten.nama">{{kabupaten.nama}}
                    </label>
                </div>
              </div>
            </div>
            <!-- table -->
            <div class="col-md-12">
              <gmap-map
                id="map"
                :center="center"
                :zoom="14"
                style="width:100%;  height: 400px;"
              >
                <gmap-marker
                  :key="index"
                  v-for="(item, index) in markers"
                  :position="item.position"
                  :icon="item.icon"
                  :clickable="true"
                  @click="openInfoWindowTemplate(item)"
                ></gmap-marker>

                <gmap-info-window
                  :options="{maxWidth: 300}"
                  :position="infoWindow.position"
                  :opened="infoWindow.open"
                  @closeclick="infoWindow.open = false">
                  <div class="info-box-wrap">
                    <progressive-img
                      class="img-medical"
                      :src="infoWindow.image"
                      placeholder="https://unsplash.it/1920/1080?image=10"                       
                    />
                    <div class="info-box-text-wrap">
                      <h6 @click="onLoadMedical(infoWindow.key)" class="title">{{infoWindow.title}}</h6>
                      <p class="info">{{infoWindow.alamatJalan}}</p>
                      <p class="info">{{infoWindow.telepon_1}}</p>
                    </div>
                    <div class="action-btns">
                      <a target="_blank" v-bind:href="infoWindow.url">
                        <img src="../assets/direction-icon.png" alt="go">
                      </a>
                    </div> 
                  </div>
                </gmap-info-window>
              </gmap-map>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "GoogleMap",
  data() {
    return {
      checkedMedical: [],
      kabupatens: [
        {
          color:'blue',
          fontColor: 'white',
          nama:'Badung',
          logo: 'https://api.emr.profdp.com/logoDaerah/badung.png'
        },
        {
          color:'green',
          fontColor: 'white',
          nama:'Tabanan',
          logo: 'https://api.emr.profdp.com/logoDaerah/tabanan.png'
        },
        {
          color:'cyan',
          fontColor: 'white',
          nama:'Denpasar',
          logo: 'https://api.emr.profdp.com/logoDaerah/denpasar.png'
        },
        {
          color:'blue',
          fontColor: 'white',
          nama:'Klungkung',
          logo:'https://api.emr.profdp.com/logoDaerah/klungkung.png'
        },
        {
          color:'red',
          fontColor: 'white',
          nama:'Karangasem',
          logo:'https://api.emr.profdp.com/logoDaerah/karangasem.png'
        },
        {
          color:'#9CBA39',
          fontColor: 'white',
          nama:'Jembrana',
          logo:'https://api.emr.profdp.com/logoDaerah/jembrana.png'
        },
        {
          color:'cyan',
          fontColor: 'white',
          nama:'Buleleng',
          logo: 'https://api.emr.profdp.com/logoDaerah/buleleng.png'
        },
        {
          color:'#EF9B0F',
          fontColor: 'white',
          nama:'Gianyar',
          logo:'https://api.emr.profdp.com/logoDaerah/gianyar.png'
        },
        {
          color:'blue',
          fontColor: 'white',
          nama:'Bangli',
          logo:'https://api.emr.profdp.com/logoDaerah/bangli.png'
        },
      ],
      url_image:'http://iotbali.com/medrec-photos',
      searchValue: '',
      suggestionAttribute:'nama',
      suggestions: [],
      selectedEvent: "",
      center: {
        lat: 45.508,
        lng: -73.587,
      },
      infoWindow: {
        position: {lat: 50, lng: 90},
        open: false,
        template: ''
      },
      clicked: false,
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  mounted() {
    this.geolocate();
    this.setMedicals();
  },
  methods: {
    onLoadMedical (id) {
      this.$router.push('/medical/' + id)
    },
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    directionService(position){
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: this.center
      });
      directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
      });

      var directionsDisplay = new google.maps.DirectionsRenderer({map : map});
      var directionsService = new google.maps.DirectionsService();

      var currentPos = this.center
      var currentPlace = new google.maps.LatLng(parseFloat(currentPos.lat), parseFloat(currentPos.lng))
      var directionPlace = new google.maps.LatLng(parseFloat(position.lat), parseFloat(position.lng))

      var request = {
        origin: currentPlace,
        destination: directionPlace,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        }
      });
      // console.log(parseFloat(currentPos.lat))
    },
    openInfoWindowTemplate (item) {
      var cl_url = "https://res.cloudinary.com/wahyupermadie/image/fetch/c_scale,fl_force_strip.progressive,w_478/f_webp/http://iotbali.com/medrec-photos/";
      this.infoWindow.position = item.position
      this.infoWindow.key = item.key
      this.infoWindow.image = cl_url+item.foto.foto1
      this.infoWindow.url = item.link
      this.infoWindow.alamatJalan = item.alamat.alamatJalan
      this.infoWindow.alamatWilayah = item.alamat.alamatWilayah
      this.infoWindow.alamatEmail = item.alamat.alamatEmail
      this.infoWindow.telepon_1 = item.telepon.telepon1
      this.infoWindow.telepon_2 = item.telepon.telepon2
      this.infoWindow.title = item.label.text
      this.infoWindow.title = item.label.text
      this.infoWindow.open = true
      this.clicked = true
      
    },
    setMedicals() {
        this.markers = []
        var url = 'https://api.emr.profdp.com/api/search/medical?q='+this.searchValue+'&value='+this.checkedMedical
        console.log(url)
        axios.get('https://api.emr.profdp.com/api/search/medical?q='+this.searchValue+'&value='+this.checkedMedical)
        .then(response => {
            // console.log(this.checkedMedical)
            for(let i = 0; i<response.data.length;i++){
              let markerIcon = {
                url: 'https://icon-icons.com/icons2/807/PNG/32/placeholder_icon-icons.com_66079.png',
                // labelOrigin: new google.maps.Point(81, 10),
              };
              let markerLabel = response.data[i].nama;
              let marker = ({
                  position: { lat: parseFloat( response.data[i].lat), lng: parseFloat( response.data[i].lng ) },
                  key:response.data[i].id,
                  icon : markerIcon,
                  link : "http://maps.google.com/maps?q="+parseFloat( response.data[i].lat )+','+parseFloat( response.data[i].lng ),
                  map: this.places,
                  label: {
                    text: markerLabel,
                    color: '#000',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  },
                  telepon:{
                    telepon1: response.data[i].telepon_1,
                    telepon2: response.data[i].telepon_2
                  },
                  foto:{
                    foto1: response.data[i].foto,
                    foto2: response.data[i].foto2,
                    foto3: response.data[i].foto3,
                  },
                  alamat:{
                    alamatJalan: response.data[i].alamat,
                    alamatWilayah: response.data[i].alamat_wilayah,
                    alamatEmail: response.data[i].email
                  },
                  jenisMedical: response.data[i].jenis
              });
              // console.log(marker)
              this.markers.push(marker);
            }
        })
        .catch(function (response){
            // console.log(response);
            alert("Could not load halaman");
        });
    },
    // addMarker() {
    //   if (this.currentPlace) {
    //     let markerIcon = {
    //       url: 'https://icon-icons.com/icons2/794/PNG/48/1-80_icon-icons.com_65644.png',
    //       labelOrigin: new google.maps.Point(81, 10),
    //     };
    //     // console.log(this.currentPlace.geometry.location)
    //     const marker = {
    //       lat: this.currentPlace.geometry.location.lat(),
    //       lng: this.currentPlace.geometry.location.lng(),
    //       icon : markerIcon,
    //     };
    //     this.markers.push({ position: marker });
    //     this.places.push(this.currentPlace);
    //     this.center = marker;
    //     this.currentPlace = null;
    //   }
    // },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        const marker = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.markers.push({ position: marker });
        this.center = marker;
      });
    },
    changed: function() {
        var vm = this
        this.suggestions = []
        axios.get('https://api.emr.profdp.com/api/search/medical?q='+this.searchValue)
            .then(function(response) {
              // console.log(response.data)
                response.data.forEach(function(a) {
                    vm.suggestions.push(a)
                })
            })
    }
  }
};
</script>

<style scoped>
.kabupaten {
    padding: 0px !important;
    margin-left: 10px !important;
}
@media only screen and (max-width: 600px) {
    .kabupaten {
        padding: 0px !important;
        margin: 0px !important;
        width: 50%
    }
}
</style>
