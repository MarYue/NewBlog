<template>
  <section class="download">
    <div class="head"></div>
    <div class="icons">
      <div class="right"></div>
      <div class="left"></div>
    </div>
    <div class="content" v-html="introTxt"></div>
    <div class="btn" @click="download">立即下载，开启有机生活<div class="icon"/></div>
  </section>
</template>

<script>
import Vue from 'vue'
import { Toast } from 'vant'
import utils from '@/utils'
Vue.use(Toast)
const { mobileEnv: { adr } } = utils
export default {
  name: 'Download',
  data () {
    return {
      introTxt: '<b>『对菇有机』</b><br>是由有芯（杭州）健康科技有限公司<br>开发的一款有机食品资讯app。<br>对菇有机与国内知名食品科学实验室合作，<br>多位国际知名专家助阵，<br>致力于打造一个科学、严谨、权威的<br>有机食品咨询平台。'
    }
  },
  methods: {
    download () {
      if (adr) {
        window.location.href = 'http://www.youxinjiankang.com/apps/pkg.apk'
      } else {
        // window.location.href = 'https://www.pgyer.com/LEDD'
        Toast('暂不提供IOS应用，敬请期待！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
