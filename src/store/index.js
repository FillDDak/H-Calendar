import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    loginUser: null,
  },
  getters: {
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user
    },
    logout(state) {
      state.loginUser = null
    }
  },
  actions: {
    async saveEvent({ state }, { date, title }) {
      if (!state.loginUser) {
        throw new Error('로그인이 필요합니다.');
      }

      const response = await axios.post('/user/save-event', { date, title });
      if (response.data.result !== 'success') {
        throw new Error(response.data.message);
      }
    }
  },
  modules: {
  }
})
