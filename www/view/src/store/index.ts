import { createStore } from "vuex";


export default createStore({
  state: {
    artList: {},
  },
  mutations: {
    setCurIdx(state, index) {
      state.curIdx = index;
    },
    setCollapsed(state,collapsed) {
      state.collapsed = !collapsed;
    }
  },
  getters: {
    getMyInfo(state) {
      return `hello ${state.name}`;
    }
  },
  actions: {},
  modules: {
  }
});
