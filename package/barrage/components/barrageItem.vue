<template>
  <div
    class="barrage-item start ordinaryOperate"
    :class="[options ? options.className : '' , isPause ? 'pausedAnimation' : '']"
    ref="item"
    :style="bindStyle"
    @click="handleClickBarrage(item.url)"
    @animationend="destroyBarrageItem(item)"
  >
    <!-- <icon :options="options.children" v-if="options.children"></icon> -->
    <VueSvg v-if="isMyBarrage" />
    {{ item.content }}
  </div>
</template>

<script>
import { BarrageType } from "../constant";
import VueSvg from "./VueSvg.vue";
import icon from "./icon.vue";
export default {
  components: { icon, VueSvg },
  name: "barrageItem",
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isPause: false
    };
  },
  mounted() {
    this.$emit("save", this.$refs.item.clientWidth || 0);
  },
  methods: {
    destroyBarrageItem(item) {
      this.$emit("destory", item);
    },
    handleClickBarrage(href) {
      this.isPause = !this.isPause;
    }
  },
  computed: {
    isMyBarrage() {
      return this.item.type === BarrageType.MYBARRAGE;
    },
    bindBraageItemStyle() {
      const { delay, top, color, args } = this.item;
      console.log("top", top);
      return {
        "--runTime": delay,
        "--offsetWidth": `-${args.offsetWidth}px`,
        top,
        color
      };
    },
    bindStyle() {
      return {
        ...this.bindBraageItemStyle
      };
    }
  }
};
</script>

<style lang="less" scoped>
.barrage-item {
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  height: 26px;
  white-space: nowrap;
  line-height: 26px;
  border-radius: 17px;
  padding: 0 10px;
  box-sizing: border-box;
  margin-top: 12px;
  font-size: 12px;
  color: #fff;
  letter-spacing: 0;
  font-weight: 400;
  animation: BraageRunningAnimation var(--runTime) linear;
}
.pausedAnimation {
  animation-play-state: paused !important;
}
// 普通运营样式
.ordinaryOperate {
  background-image: linear-gradient(
    95deg,
    rgba(48, 108, 255, 0.2) 0%,
    rgba(165, 207, 255, 0.2) 100%
  );
}

.start {
  transform: translateX(110%);
}

@keyframes BraageRunningAnimation {
  0% {
    transform: translateX(110%);
  }

  100% {
    transform: translateX(var(--offsetWidth));
  }
}
</style>