import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import MedicalPlace from '@/components/MedicalPlace'

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

