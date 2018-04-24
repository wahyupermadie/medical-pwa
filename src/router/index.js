import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import(/* webpackChunkName: "home" */ '@/components/Index.vue')
const MedicalPlace = () => import(/* webpackChunkName: "detail" */ '@/components/MedicalPlace.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/medical/:id',
      props: true,
      name: 'MedicalPlace',
      component: MedicalPlace
    }
  ]
})

