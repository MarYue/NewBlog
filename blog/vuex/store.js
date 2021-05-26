/* eslint-disable no-return-assign */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 1
}

// 利用 mutations 同步修改状态
// 改变 state 的数值的方法，必须写在 mutation 中
const mutations = {
  // 可以传参数
  add (state, n) {
    state.count += n
  },
  reduce (state, n = 1) {
    state.count -= n
  }
}

// getters 可以看作在获取数据前进行的一种再编辑，相当于对数据的一种过滤和加工。可以看作 store.js 的计算属性
const getters = {
  count: function (state) {
    return state.count += 5
  }
}

// 利用 actions 异步修改状态
// actions 可以调用 mutations 里的方法
const actions = {
  // context 上下文对象，可以理解称 store 本身
  addAction (context) {
    context.commit('add', 5)
    setTimeout(() => {
      context.commit('reduce')
    }, 3000)
    console.log('我比reduce提前执行')
  },
  // {commit} 直接把commit对象传递过来，让方法体逻辑和代码更清晰明了
  reduceAction ({commit}) {
    commit('reduce')
  }
}

// 用模块组的方式，分组后按组编写
const moduleA = {
  state, mutations, getters, actions
}

export default new Vuex.Store({
  state, mutations, getters, actions
})

export { moduleA }
