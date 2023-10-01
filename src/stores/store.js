import { createStore } from 'vuex';

const state = {
  querys: []
}

const mutations = {
  addQuery(state, data) {
    state.querys.push(data)
  }
}

const store = createStore({
  state, mutations
})

export default store