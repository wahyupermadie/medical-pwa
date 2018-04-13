import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        loadPlaces: {},
        loading: false
    },
    mutations:{
        setLoadPlace(state, payload){
            state.loadPlaces = payload
        },
        setLoading(state, payload){
            state.loading = payload.status
        }
    },
    actions:{
        getPlace({commit},id){
            commit('setLoading', {status: true})
            axios.get('http://127.0.0.1:8000/api/medical_center/'+id).
                then(response => {
                    commit('setLoadPlace', response.data)
                    console.log(response.data)
            })
        }
    },
    getters:{
        getPlace (state) {
            return state.loadPlaces
        },
    }
  })