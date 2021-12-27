import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    routerList: []
  },
  getters: {
    getrouterList: state => {
      return state.routerList;
    }
  },
  mutations: {
    ADD(state, routerName) {
      state.routerList.push(routerName);
    },
    DEL(state, routerName) {
      state.routerList.forEach((item, index) => {
        if (item === routerName) {
          state.routerList.splice(index);
        }
      });
    }
  },
  actions: {
    add({ commit }, routerName) {
      commit("ADD", routerName);
    },
    delete({ commit }, routerName) {
      commit("DEL", routerName);
    }
  },
  modules: {
  }
})
