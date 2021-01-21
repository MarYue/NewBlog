<template>
  <div class="toast" v-if="showToast">{{ toastArr }}</div>
</template>

<script>
export default {
  name: 'Toast',
  props: {
    showToast: {
      type: Boolean,
      default: false
    },
    toastArr: {
      type: String,
      default: ''
    }
  },
  created () {
    console.log(this.toastArr)
  }
}
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  z-index: 1001;
  height: 1.5rem;
  transition: all 0.5s;
  font-size: .48rem;
  padding: 0 1rem;
  line-height: 1.5rem;
  border-radius: .2rem;
}
</style>
