<template>
  <section class="pageWrapper">
    <div class="scroll">
      <div class="articleWrapper">
        <!-- <div class="rotation" /> -->
        <img class="rotation" src="./images/冬天.png">
        <van-divider :style="{color:'#FFCD43',borderColor:'#000'}">最新文章</van-divider>
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
    <button @click="showToast">更多</button>
    <button @click="showUser">个人中心</button>
    <Toast :show-toast="isLoading" :toast-arr="str" />
    <Login ref="login"/>
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
// const { parse } = require('querystring')
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
    const hasLogin = sessionStorage.getItem('hasLogin')
    if (!hasLogin) {
      this.$refs.login._show()
    }
  },
  methods: {
    showToast () {
      this.str = 'hello'
      // this.isLoading = this.isLoading !== true
      this.$router.push('/Types')
    },
    showUser () {
      this.$router.push('/User')
    },
    to (e) {
      console.log(e.currentTarget.id)
      // this.$router.push({path: `/Home/${e.currentTarget.id}`})
    }
    // wxLogin () {
    //   // // 本地未存储用户信息
    //   // if (!userInfo || !userInfo.unionid) {
    //   const { href, search } = window.location
    //   const { code, cbUrl } = parse(search.substr(1))
    //   if (!code) {
    //     window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${href}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
    //   } else if (code) {
    //     window.history.replaceState(null, null, '/wxLogin')
    //     // 通过code获取unionid
    //     http.get('/authorize/tencent', { code, release: 'SALE' }).then(userInfo => {
    //       // unionid加入缓存
    //       window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    //       // 跳转至原页面
    //       cbUrl && window.location.replace(cbUrl)
    //     }).catch(err => {})
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './index.scss';
</style>
