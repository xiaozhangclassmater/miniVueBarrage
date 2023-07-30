<template>
  <div id="app">
    <!-- <miniVueBarrage /> -->
    <miniVueBarrage
      :barrages="barrages"
      :definStyle="myStyle"
      :createTime="0.5"
      :jumpLinkFlag="false"
      isBatchDestory
      fullScreen
      ref="barrage"
    ></miniVueBarrage>
    <div class="operation">
      <input type="text" v-model="value" @keyup.enter="add()" />
      <br />
      <button @click="add">添加弹幕</button>
      <br />
      <button @click="reset">重置弹幕</button>
      <br />
      <button @click="pause">暂停弹幕</button>
      <br />
      <button @click="close">关闭弹幕</button>
      <br />
      <button @click="paly">开启弹幕</button>
      <br />
      <div>
        <input type="color" name id v-model="color" />
        <button @click="changeColor">切换颜色</button>
      </div>
    </div>
  </div>
</template>
<script>
import data from "../Mock/index";
import Barrage from "../package/barrage/index.vue";
// import { miniVueBarrage } from "../dist/lib";
// import "../dist/lib/mini-vue-barrage.css";
export default {
  components: {
    Barrage
    // miniVueBarrage
  },
  data() {
    return {
      value: "",
      color: "#000",
      barrages: data.list
    };
  },

  mounted() {
    console.log("", data.list);
  },
  computed: {
    myStyle() {
      return { border: "0.005rem solid rgba(255,117,21,1)" };
    }
  },
  methods: {
    add(e) {
      if (!this.value.trim()) return;
      this.$refs.barrage.add({
        content: this.value
      });
      this.value = "";
    },
    reset() {
      this.$refs.barrage.reset();
    },
    pause() {
      this.$refs.barrage.pause();
    },
    close() {
      this.$refs.barrage.close();
    },
    paly() {
      this.$refs.barrage.play();
    },
    changeColor() {
      this.$refs.barrage.changeColor(this.color);
    }
  }
};
</script>
<style lang="less">
html,
body,
#app,
.top-stage {
  width: 100%;
  height: 100%;
  margin: 0;
  position: relative;
}
</style>
