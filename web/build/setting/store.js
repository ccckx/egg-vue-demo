import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default function createStore () {
  return new Vuex.Store({
    state: {},
    mutations: {
      initSsrState (state, pload) {
        for (let i in pload) {
          state[i] = pload[i]
        }
      }
    }
  })
}