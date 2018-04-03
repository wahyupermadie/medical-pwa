<template>
  <div class="container">
    <div class="row">
      <div>
        <h2>Search and add a pin</h2>
          <gmap-autocomplete
            @place_changed="setPlace">
          </gmap-autocomplete>
          <button @click="addMarker">Add</button>
        <br/>

      </div>
      <br>
      <gmap-map
        id="map"
        :center="center"
        :zoom="12"
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
          <div id="thediv">
            <p>{{infoWindow.title}}</p>
          </div>
        </gmap-info-window>
      </gmap-map>
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
        lng: -73.587 
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
    this.setMarkers();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    openInfoWindowTemplate (item) {
      this.infoWindow.position = item.position
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
                  map: this.place,
                  label: {
                    text: markerLabel,
                    color: '#000',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }
              });
              this.markers.push( marker );
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
      });
    }
  }
};
</script>