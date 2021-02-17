import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ArtList: {},
    total: 0,
    pageSizeOptions: ["3", "5", "7", "10", "15"],
    queryParam: { title: "", PageSize: 7, Current: 1 },
  },
  mutations: {
    setData(state, data) {
      state.ArtList = data;
      state.total = data.total
    }
  },
  actions: {
    // 获取所有文章
    async getArtList(ctx, payload) {
      const { title, pageSize, pageNum } = payload;
      axios.get("/articles", {
        params: {
          title: title,
          pageSize: pageSize,
          pageNum: pageNum,
        },
      }).then((res) => {
        ctx.commit('setData', res.data)
      })
    },
    // 获取指定分类下的所有文章
    async getArtListByClass(ctx, payload) {
      const { title, pageSize, pageNum, id } = payload;
      axios.get(`article/catelist/${id}`, {
        params: {
          title: title,
          pageSize: pageSize,
          pageNum: pageNum,
        },
      }).then((res) => {
        ctx.commit('setData', res.data)
      })
    }
  },
  modules: {
  }
})