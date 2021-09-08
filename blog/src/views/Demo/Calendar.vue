<template>
  <section class="page">
    <div class="tit">日历</div>
    <vue-hash-calendar
      visible.sync="true"
      style="display: block;"
      :picker-type="'date'"
      :change-year-fast="true"
      :scroll-change-date="false"
      :max-date="maxDate"></vue-hash-calendar>
  </section>
</template>

<script>
import Vue from 'vue'
// 日历组件
import vueHashCalendar from 'vue-hash-calendar'
import 'vue-hash-calendar/lib/vue-hash-calendar.css'
Vue.use(vueHashCalendar)

export default {
  data () {
    return {
      maxDate: new Date('2023-12-31')
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  // min-height: 100vh;
}
</style>
