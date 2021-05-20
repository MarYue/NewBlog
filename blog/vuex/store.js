import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

// 改变 state 的数值的方法，必须写在 mutation 中
const mutations = {
  // 可以传参数
  add (state, n) {
    state.count += n
  },
  reduce (state) {
    state.count--
  }
}

// getters 可以看作在获取数据前进行的一种再编辑，相当于对数据的一种过滤和加工。可以看作 store.js 的计算属性
const getters = {
  count: function (state) {
    let res = state.count
    res += 5
    state.count = res
    return state.count
  }
}

export default new Vuex.Store({
  state, mutations, getters
})
