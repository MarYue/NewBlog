<template>
  <section class="pageWrapper">
    <van-grid square :gutter="10" :column-num="3" class="grid">
      <van-grid-item v-for="(item, idx) in typesList" :key="idx" :text="item.tit" :icon="item.icon" :to="item.to" :id="item.id"/>
    </van-grid>
    <img :src="images['夏天']" alt="">
  </section>
</template>

<script>
import Vue from 'vue'
import { Grid, GridItem } from 'vant'
import { typesList } from './data'
import utils from '@/utils'
const { getImgs } = utils
Vue.use(Grid)
Vue.use(GridItem)
export default {
  mounted () {
    // console.log(this.typesList)
  },
  data () {
    return {
      typesList,
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
