<template>
  <section class="vuex">
    <CountVuex />
  </section>
</template>

<script>
import CountVuex from '@/components/countVuex'
export default {
  components: { CountVuex },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/common.scss';
.page {
  min-height: 100vh;
  background-color: #f1f1f1;
  padding-top: .4rem;
}
</style>
