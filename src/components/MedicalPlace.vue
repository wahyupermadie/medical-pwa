<template>
  <div class="container" style="padding-top: 15px; padding-bottom: 15px">
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
                <progressive-img
                  placeholder="https://unsplash.it/1920/1080?image=10"
                  v-bind:src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_scale,fl_force_strip.progressive,w_478/f_webp/http://iotbali.com/medrec-photos/'+publicMedical.foto" :alt="publicMedical.nama" 
                  style="width:100%; maxHeight: 500px" />
              </div>

              <div class="item">
                <progressive-img 
                  blur:30
                  placeholder="https://unsplash.it/1920/1080?image=10"
                  v-bind:src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_scale,fl_force_strip.progressive,w_478/f_webp/http://iotbali.com/medrec-photos/'+publicMedical.foto2" :alt="publicMedical.nama" 
                  style="width:100%; maxHeight: 500px" />
              </div>
            
              <div class="item">
               <progressive-img 
                  placeholder="https://unsplash.it/1920/1080?image=10"
                  v-bind:src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_scale,fl_force_strip.progressive,w_478/f_webp/http://iotbali.com/medrec-photos/'+publicMedical.foto3" :alt="publicMedical.nama" 
                  style="width:100%; maxHeight: 500px" />
              </div>
          
            </div>
          </div>
          <br/>
      </div>
      <div class="col-md-6">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">Nama Pelayanan Kesehatan</div>
            <div class="panel-body">
              {{publicMedical.nama}}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">No Telepon 1</div>
            <div class="panel-body">
              {{publicMedical.telepon_1}}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="panel panel-default">
            <div class="panel-heading">No Telepon 2</div>
            <div class="panel-body">
              {{publicMedical.telepon_2}}
            </div>
          </div>
        </div>
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">Alamat</div>
            <div class="panel-body">
              {{publicMedical.alamat}}
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12">
        <gmap-map
          id="map"
          :center="{lat: parseFloat(publicMedical.lat), lng: parseFloat(publicMedical.lng)}"
          :zoom="14"
          style="width:100%;  height: 400px;"
        >
        <gmap-marker
          :position="{lat: parseFloat(publicMedical.lat), lng: parseFloat(publicMedical.lng)}"
          :icon="icon"
          :clickable="true"
          @click="openInfoWindowTemplate(publicMedical)"
        ></gmap-marker>
          <gmap-info-window
          :options="{maxWidth: 300}"
          :position="{lat: parseFloat(publicMedical.lat), lng: parseFloat(publicMedical.lng)}"
          :opened="infoWindow.open"
          @closeclick="infoWindow.open = false">
          <div class="info-box-wrap">
            <progressive-img
              class="img-medical"
              v-bind:src="'https://res.cloudinary.com/wahyupermadie/image/fetch/c_scale,fl_force_strip.progressive,w_478/f_webp/http://iotbali.com/medrec-photos/'+publicMedical.foto"
              placeholder="https://unsplash.it/1920/1080?image=10"                       
            />
            <div class="info-box-text-wrap">
              <h6 class="title">{{publicMedical.nama}}</h6>
              <p class="info">{{publicMedical.alamat}}</p>
              <p class="info">{{publicMedical.telepon_1}}</p>
            </div>
            <div class="action-btns">
              <a target="_blank" v-bind:href="'http://maps.google.com/maps?q='+parseFloat(publicMedical.latitude )+','+parseFloat(publicMedical.longitude )">
                <img src="../assets/direction-icon.png" alt="go">
              </a>
            </div> 
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
          position:{},
          icon:{
            url: 'https://icon-icons.com/icons2/794/PNG/48/1-80_icon-icons.com_65644.png',
          },
        }
      },
      computed: {
        publicMedical(){
            console.log(this.$store.getters.getMedical)
            return this.$store.getters.getMedical
        },
      },
      created(){
        this.$store.dispatch('loadedMedical', {id: this.id})
      },
      methods: {
        openInfoWindowTemplate (publicMedical) {
          // console.log(publicMedical)
          this.infoWindow.position = {
              lat: parseFloat(publicMedical.latitude),
              lng: parseFloat(publicMedical.longitude)
          };
          this.infoWindow.open = true
          this.clicked = true
        },
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

