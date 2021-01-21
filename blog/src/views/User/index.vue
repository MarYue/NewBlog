<template>
  <section class="pageWrapper">
    <!-- <van-image class="userIcon" round width="2rem" height="2rem" :src="avatar" /> -->
    <img class="avatar" :src="images['deer']" alt="">
    <div class="selections">
      <van-cell value="我的收藏" icon="star-o" is-link to="/" />
      <van-cell value="历史阅读" icon="browsing-history-o" is-link to="/" />
      <van-cell value="设置中心" icon="setting-o" is-link to="/" />
    </div>
    <img class="bg" :src="images['sunset']" alt="">
  </section>
</template>

<script>
import Vue from 'vue'
import { Image as VanImage, Cell } from 'vant'
import utils from '@/utils'
const { getImgs } = utils
Vue.use(VanImage)
Vue.use(Cell)

export default {
  mounted () {
    // console.log(this.typesList)
  },
  data () {
    return {
      avatar: './images/deer.png',
      images: getImgs(require.context('./images', false, /\.png$/))
    }
  },
  methods: {
    to (e) {
      console.log(e.currentTarget.id)
      // this.$router.push({
      //   path: `/Types/${e.currentTarget.id}`
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
