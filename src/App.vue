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
    Copyright © 2018 by ProfDP
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
      height: 45px;
      font-size: 15px;
      bottom: 0;
    }
</style>
