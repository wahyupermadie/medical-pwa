<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Public Medical Service</span>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">MENU</span>
      <nav class="mdl-navigation">
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Home</router-link>
        <router-link class="mdl-navigation__link" to="/" @click.native="hideMenu">Post a picture</router-link>
      </nav>
    </div>
    <main class="mdl-layout__content">
      <div class="page-content">
        <router-view :key="$route.path"></router-view>
      </div>
    </main>
    <footer style="background-color: rgb(33,150,243) !important; padding:15px; color:#ffffff" class="mdl-mini-footer">
      Copyright © 2018 by Wahyu Permadi
    </footer>
  </div>

</template>
<script>
require('material-design-lite')
export default {
  name: 'app',
  data(){
    return{
     
    }
  },
  mounted() {
      //do something after mounting vue instance
      var app = this;
  },
  methods: {
    hideMenu: function () {
      document.getElementsByClassName('mdl-layout__drawer')[0].classList.remove('is-visible')
      document.getElementsByClassName('mdl-layout__obfuscator')[0].classList.remove('is-visible')
    },
  } 
}
</script>
<style>
  @import url('https://code.getmdl.io/1.2.1/material.blue-red.min.css');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
