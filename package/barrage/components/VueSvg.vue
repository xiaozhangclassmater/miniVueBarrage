<template>
  <svg class="logo" viewBox="0 0 128 128" :style="styles" data-v-7bd21367>
    <path
      fill="#42b883"
      d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z"
      data-v-7bd21367
    />
    <path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-7bd21367 />
  </svg>
</template>
<script>
export default {
  props: {
    styles: {
      type: Object,
      default: () => ({
        width: "15px",
        height: "15px"
      })
    }
  }
};
</script>
<style lang='less' scoped>
</style>