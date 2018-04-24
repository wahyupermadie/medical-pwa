<template>
  <div>
    <nav style="background-color: rgb(33, 150, 243) !important;" class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header" >
          <a class="navbar-brand" style="color: #ffff !important;" href="#">GIS of Medical Center</a>
        </div>
      </div>
    </nav>
      <div style="padding-top: 50px;" class="page-content">
        <router-view :key="$route.path"></router-view>
      </div>
    <footer class="footer">
    Copyright © 2018 by Prof. Dr. I Ketut Gede Darma Putra, S.Kom., M.T.
  </footer>
  </div>

</template>
<script>
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
    backToMain(){
      this.$router.push('/')
    },
  } 
}
</script>
<style>
.header,
    .footer {
      padding: 10px;
      width: 100%;
      background-color: rgb(33, 150, 243) !important;
      color: #ffff;
      display: flex;
      align-items: center;
      position: fixed;
      left: 0;
    }
    .footer {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      justify-content: left;
      height: 50px;
      font-size: 1.5rem;
      bottom: 0;
    }
</style>
