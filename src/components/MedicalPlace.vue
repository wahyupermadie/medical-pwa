<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
          <div id="myCarousel" class="carousel slide" style="height:inherit !important" data-ride="carousel">
            <!-- Indicators -->
            <ol class="carousel-indicators">
              <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#myCarousel" data-slide-to="1"></li>
              <li data-target="#myCarousel" data-slide-to="2"></li>
            </ol>

            <!-- Wrapper for slides -->
            <div class="carousel-inner">

              <div class="item active">
                <img src="https://www.w3schools.com/bootstrap/la.jpg" alt="Los Angeles" style="width:100%;">
                <div class="carousel-caption">
                  <h3>Los Angeles</h3>
                  <p>LA is always so much fun!</p>
                </div>
              </div>

              <div class="item">
                <img src="https://www.w3schools.com/bootstrap/chicago.jpg" alt="Chicago" style="width:100%;">
                <div class="carousel-caption">
                  <h3>Chicago</h3>
                  <p>Thank you, Chicago!</p>
                </div>
              </div>
            
              <div class="item">
                <img src="https://www.w3schools.com/bootstrap/ny.jpg" alt="New York" style="width:100%;">
                <div class="carousel-caption">
                  <h3>New York</h3>
                  <p>We love the Big Apple!</p>
                </div>
              </div>
          
            </div>

            <!-- Left and right controls -->
            <a class="left carousel-control" href="#myCarousel" data-slide="prev">
              <span class="glyphicon glyphicon-chevron-left"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="right carousel-control" href="#myCarousel" data-slide="next">
              <span class="glyphicon glyphicon-chevron-right"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <br/>
      </div>
      <div class="col-md-6">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">Nama Pelayanan Kesehatan</div>
            <div class="panel-body">
              {{place.nama}}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">No Telepon 1</div>
            <div class="panel-body">
              {{place.telepon_1}}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">No Telepon 2</div>
            <div class="panel-body">
              {{place.telepon_2}}
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">Alamat</div>
            <div class="panel-body">
              {{place.alamat}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <gmap-map
          id="map"
          :center="position"
          :zoom="14"
          style="width:100%;  height: 400px;"
        >
        <gmap-marker
          :position="position"
          :icon="icon"
          :clickable="true"
          @click="openInfoWindowTemplate(place)"
        ></gmap-marker>
          <gmap-info-window
          :options="{maxWidth: 300}"
          :position="position"
          :opened="infoWindow.open"
          @closeclick="infoWindow.open = false">
          <div id="iw-container">
            <div class="iw-title">{{place.nama}}</div>
            <div class="iw-content">
              <img src="http://maps.marnoto.com/en/5wayscustomizeinfowindow/images/vistalegre.jpg" alt="Porcelain Factory of Vista Alegre" height="115" width="100%">
              <div class="iw-subTitle">Contacts</div>
              <p><span class="glyphicon glyphicon-home"> {{place.alamat}}</span>
              <br><span class="glyphicon glyphicon-phone"> {{place.telepon_1}}</span>
              <br><span class="glyphicon glyphicon-phone"> {{place.telepon_2}}</span>
              <br>www: www.myvistaalegre.com
              </p>
            </div>
            <a target="_blank" v-bind:href="infoWindow">
              <img src="../assets/direction-icon.png" alt="go">
            </a>
            <!-- <router-link :to="{ name: 'MedicalPlace', params:{key_medical: infoWindow}}">Show Detail</router-link> -->
          </div>
          </gmap-info-window>
        </gmap-map>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Vue from 'vue'
  export default {
      props: ['id'],
      name: "MedicalPlace",
      data(){
        return{
          infoWindow: {
            position: {lat: 50, lng: 90},
            open: false,
            template: ''
          },
          clicked: false,
          place:{},
          url:'http://127.0.0.1:8000/api/medical_center/'+this.$route.params.id,
          position:{},
          icon:{
            url: 'https://icon-icons.com/icons2/794/PNG/48/1-80_icon-icons.com_65644.png',
          },
        }
      },
      mounted(){
        this.getPlace()
      },
      methods: {
        openInfoWindowTemplate (place) {
          console.log(place)
          this.infoWindow.position = {
              lat: parseFloat(place.latitude),
              lng: parseFloat(place.longitude)
          };
          this.infoWindow.open = true
          this.clicked = true
        },
        getPlace(){
          axios.get(this.url).then(response => {
            this.place = response.data
            this.position = {
              lat: parseFloat(response.data.latitude),
              lng: parseFloat(response.data.longitude)
            };
            console.log(response.data)
          })
        }
      }
  }
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

