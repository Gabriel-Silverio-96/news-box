import { createStore } from 'vuex';

const state = {
  queries: []
}

const mutations = {
  addQuery(state, data) {
    state.queries.push(data)
  }
}

const store = createStore({
  state, mutations
})

export default store