
<template>
  <div class="barrage-Icon">
    <img class="icon" v-if="isHttpOrbase64" :src="options.Icon" alt />
    <img v-else src="../assets/vue.png" alt />
  </div>
</template>
<script>
export default {
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isHttpOrbase64() {
      return /^(http|https|data:.*;base64)/.test(this.options?.Icon || "");
    }
  }
};
</script>
<style lang="less" scoped>
.barrage-Icon {
  width: 20px;
  height: 18px;
  margin-right: 2px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
</style>
