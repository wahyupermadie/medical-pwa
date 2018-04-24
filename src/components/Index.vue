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
        axios.get('https://api.medcan.futnet.id/api/search/medical?q='+this.searchValue,)
        .then(response => {
            console.log(response.data)
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
        axios.get('https://api.medcan.futnet.id/api/search/medical?q='+this.searchValue)
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
  .info-box-wrap {
  background:#fff;
  overflow: hidden;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.08);
}
.info-box-text-wrap {
  height:inherit !important;
  width:120px;
  float:left;
  overflow: hidden;
}
.action-btns {
  float:left;
  width:30px;
  overflow: hidden;
  position: relative;
  top:12px;
  left: 6px;
}
.action-btns i {
  font-size: 18px;
  color: #78A737;
  margin-left: 3px;
}
.action-btns i:hover {
  transition: color 0.5s ease;
  color:#ccc;
  cursor: pointer;
}
.action-btns i.fa-heart-o {
  font-weight: bold;
}
.info-box-text-wrap h6.title {
  padding:6px 5px 1px 0;
  margin:0 0 0 0;
  font-family:"Roboto Slab";
  color: #0c99c8;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.info-box-text-wrap p {
  padding:0 0 0 0;
  margin:0 0 0 0;
}
.info-box-text-wrap p.info {
  color:#B25B00;
}
 
.info-box-wrap  .img-medical {
  width:40px !important;
  height:40px;
  float:left;
  margin-right: 10px;
  padding-top:0;
  margin-top:0;
}
</style>
