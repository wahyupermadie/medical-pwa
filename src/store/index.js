import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        loadMedical: {},
        loading: false
    },
    mutations:{
        setLoadMedical(state, payload){
            state.loadMedical = payload
        },
        setLoading(state, payload){
            state.loading = payload.status
        }
    },
    actions:{
        loadedMedical({commit},{id}){
            commit('setLoading', {status: true})
            axios.get('https://api.emr.profdp.com/api/medical_center/'+id).
                then(response => {
                    commit('setLoadMedical', response.data)
                    commit('setLoading', {status: false})
                    // console.log(response.data)
            })
        }
    },
    getters:{
        getMedical(state) {
            return state.loadMedical
        },
    }
  })