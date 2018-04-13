<template>
  <div class="container">
    <div class="row">
      <div class="panel panel-default">
        <div class="panel-heading">PUBLIC HEALTH SERVICE</div>
          <div class="panel-body">
            <div class="form-group form-float" style="margin-bottom: 25px !important">
              <div class="col-md-5" style="padding-left: 0px !important">
                <div class="form-group">
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
                  </button>
              </div>
            </div>
            <!-- table -->
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
                <div id="iw-container">
                  <div class="iw-title">{{infoWindow.title}}</div>
                  <div class="iw-content">
                    <div class="iw-subTitle">History</div>
                    <img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="83">
                    <p>Founded in 1824, the Porcelain Factory of Vista Alegre was the first industrial unit dedicated to porcelain production in Portugal. For the foundation and success of this risky industrial development was crucial the spirit of persistence of its founder, José Ferreira Pinto Basto. Leading figure in Portuguese society of the nineteenth century farm owner, daring dealer, wisely incorporated the liberal ideas of the century, having become "the first example of free enterprise" in Portugal.</p>
                    <div class="iw-subTitle">Contacts</div>
                    <p>VISTA ALEGRE ATLANTIS, SA<br>3830-292 Ílhavo - Portugal<br>
                      <br>Phone. +351 234 320 600<br>e-mail: geral@vaa.pt<br>www: www.myvistaalegre.com</p>
                  </div>
                  <a target="_blank" v-bind:href="infoWindow.url">
                    <img src="../assets/direction-icon.png" alt="go">
                  </a>
                  <button class="btn btn-primary" @click="onLoadMedical(infoWindow.key)"></button> Show Detail
                </div>
              </gmap-info-window>
            </gmap-map>
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
      markers: [
      {
        position:{
          lat:-8.7896593,
          lng:115.1721568,
        },
        key: '123',
        icon:{
            url: 'https://icon-icons.com/icons2/794/PNG/48/1-80_icon-icons.com_65644.png',
        },
        label: {
          text: 'RS PTN UDAYANA',
          color: '#000',
          fontSize: '14px',
          fontWeight: 'bold'
        },
        link: "http://maps.google.com/maps?q=-8.7896593,115.1721568"
      },{
        position:{
          lat:-8.6754714,
          lng:115.2093129,
        },
        key: '456',
        icon:{
            url: 'https://icon-icons.com/icons2/794/PNG/48/1-80_icon-icons.com_65644.png',
        },
        label: {
          text: 'RS SANGLAH',
          color: '#000',
          fontSize: '14px',
          fontWeight: 'bold'
        },
        link: "http://maps.google.com/maps?q=-8.6754714,115.2093129"
      },{
        position:{
          lat:-8.5786545,
          lng:115.1807797,
        },
        key:'789',
        icon:{
            url: 'https://icon-icons.com/icons2/794/PNG/48/1-80_icon-icons.com_65644.png',
        },
        label: {
          text: 'RS BADUNG',
          color: '#000',
          fontSize: '14px',
          fontWeight: 'bold'
        },
        link: "http://maps.google.com/maps?q=-8.5786545,115.1807797"
      }],
      places: [],
      currentPlace: null
    };
  },
  mounted() {
    this.geolocate();
    this.setMarkers();
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
      console.log(item)
      this.infoWindow.position = item.position
      this.infoWindow.key = item.key
      this.infoWindow.url = item.link
      this.infoWindow.title = item.label.text
      this.infoWindow.open = true
      this.clicked = true
    },
    setMarkers() {
        this.markers = []
        axios.get('http://127.0.0.1:8000/api/medical_center')
        .then(response => {
            for(let i = 0; i<response.data.length;i++){
              let markerIcon = {
                url: 'https://icon-icons.com/icons2/794/PNG/48/1-80_icon-icons.com_65644.png',
                labelOrigin: new google.maps.Point(81, 10),
              };
              let markerLabel = response.data[i].nama;
              let marker = ({
                  position: { lat: parseFloat( response.data[i].latitude ), lng: parseFloat( response.data[i].longitude ) },
                  key:response.data[i].id,
                  icon : markerIcon,
                  link : "http://maps.google.com/maps?q="+parseFloat( response.data[i].latitude )+','+parseFloat( response.data[i].longitude ),
                  map: this.places,
                  label: {
                    text: markerLabel,
                    color: '#000',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }
              });
              console.log(marker)
              this.markers.push(marker);
            }
        })
        .catch(function (response){
            console.log(response);
            alert("Could not load halaman");
        });
    },
    addMarker() {
      if (this.currentPlace) {
        let markerIcon = {
          url: 'https://icon-icons.com/icons2/794/PNG/48/1-80_icon-icons.com_65644.png',
          labelOrigin: new google.maps.Point(81, 10),
        };
        console.log(this.currentPlace.geometry.location)
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
          icon : markerIcon,
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
    },
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
    }
  }
};
</script>

<style scoped>
  .medical-image{
    height: 150px;
    width: 130px;
  }
  .medical{
    text-align: center;
  }
  #iw-container {
    margin-bottom: 10px;
  }
  #iw-container .iw-title {
    font-family: 'Open Sans Condensed', sans-serif;
    font-size: 22px;
    font-weight: 400;
    padding: 10px;
    background-color: #48b5e9;
    color: white;
    margin: 0;
    border-radius: 2px 2px 0 0;
  }
  #iw-container .iw-content {
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    margin-right: 1px;
    padding: 15px 5px 20px 15px;
    max-height: 140px;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .iw-content img {
    float: right;
    margin: 0 5px 5px 10px;
  }
  .iw-subTitle {
    font-size: 16px;
    font-weight: 700;
    padding: 5px 0;
  }
  .iw-bottom-gradient {
    position: absolute;
    width: 326px;
    height: 25px;
    bottom: 10px;
    right: 18px;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
    background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
    background: -moz-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
    background: -ms-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  }
</style>
