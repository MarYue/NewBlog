<template>
  <section class="pinyin">
    <div class="desc">拼音转换器</div>
    <input type="text" class="input" placeholder="请输入汉字" v-model="inputVal">
    <button class="btn" @click="getResult">转换</button>
    <button class="btn" @click="reset">清空</button>
    <div class="result">转换结果：<span class="result">{{ result }}</span></div>
    <button class="btn" @click="goBack">返回</button>
  </section>
</template>

<script>
import { pinyin } from 'pinyin-pro'
export default {
  data () {
    return {
      inputVal: '',
      result: ''
    }
  },
  methods: {
    getResult () {
      const { inputVal } = this
      const res = pinyin(inputVal)
      console.log(res)
      this.result = res
    },
    reset () {
      this.inputVal = ''
      this.result = ''
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/style/common.scss';
.pinyin {
  font-size: .46rem;
  .input {
    width: 5rem;
    margin: 0 auto;
  }
  .result {
    width: 5rem;
  }
}
</style>
