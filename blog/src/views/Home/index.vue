<template>
  <section class="pageWrapper">
    <div class="scroll">
      <div class="articleWrapper">
        <!-- <div class="rotation" /> -->
        <img class="rotation" src="./images/冬天.png">
        <van-divider :style="{color:'#FFCD43',borderColor:'#000'}">最新文章</van-divider>
        <button @click="showToast">点我</button>
        <div class="cardGroup">
          <div class="card" v-for="(item, idx) in list" :key="idx" @click="to($event)" :ID="item.id">
            <img :src="images[item.pic]" class="cardImg" alt="">
            <div class="cardDetail">
              <div class="title">{{ item.title }}</div>
              <div class="desc">{{ item.desc }}</div>
              <div class="stastic">点击量：{{ item.hits }}&nbsp;&nbsp;&nbsp;&nbsp;收藏量：{{ item.likes }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Toast :show-toast="isLoading" :toast-arr="str" />
    <!-- <Login /> -->
  </section>
</template>

<script>
import Vue from 'vue'
import { Divider } from 'vant'
import Toast from '@/components/toast'
import Login from '@/components/login'
import utils from '@/utils'
import { list } from './data'
Vue.use(Divider)
const { getImgs } = utils

export default {
  name: 'HelloWorld',
  components: {
    Toast, Login
  },
  data () {
    return {
      list,
      isLoading: false,
      str: 'hello',
      images: getImgs(require.context('./images', false, /\.png$/)),
      ID: null
    }
  },
  mounted () {
    // console.log(this.list)
  },
  methods: {
    showToast () {
      this.str = 'hello'
      // this.isLoading = this.isLoading !== true
      this.$router.push('/Types')
    },
    to (e) {
      console.log(e.currentTarget.id)
      // this.$router.push({path: `/Home/${e.currentTarget.id}`})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './index.scss';
</style>
