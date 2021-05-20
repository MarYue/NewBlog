<template>
  <div>
    <h4>{{ msg }}</h4>
    <hr />
    <h5>{{ count }}</h5>
    <!-- Vuex 提供了 commit 方法来修改状态，可以传递参数 -->
    <!-- 可以引入 mapMutations，在模板中直接使用 mutations 中的方法 -->
    <!-- <button @click="$store.commit('add', 0.5)">+</button> -->
    <button @click="add(0.5)">+</button>
    <!-- <button @click="$store.commit('reduce')">-</button> -->
    <button @click="reduce">-</button>
  </div>
</template>

<script>
import store from '../../vuex/store'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'CountVuex',
  data () {
    return {
      msg: 'Hello, Vuex!'
    }
  },
  methods: mapMutations(['add', 'reduce']),
  // // 方法一：通过computed的计算属性直接赋值
  // computed: {
  //   count () {
  //     return this.$store.state.count
  //   }
  // },

  // // 方法二：通过 mapState 的对象来赋值（需要先引入 mapState ）
  // computed: mapState({
  //   count: state => state.count // 使用 es6 的箭头函数给count赋值
  // }),

  // 方法三：通过 mapState 的数组来赋值 *** 最常用的，最简单的写法
  computed: {
    // vue 中只能有一个computed属性，如果写多个只有最后一个能用。所以可以用展开运算符将多个computed进行合并
    ...mapState(['count']),
    ...mapGetters(['count'])
  },
  store
}
</script>

<style>

</style>
