<template>
  <div
    class="barrage-item start common"
    :class="[options ? options.className : '' , isPause ? 'pausedAnimation' : '']"
    ref="item"
    :style="bindStyle"
    @click="handleClickBarrage(item.url)"
    @animationend="destroyBarrageItem(item)"
  >
    <Icon :options="item" />
    {{ item.content }}
  </div>
</template>

<script>
import { BarrageType } from "../constant";
import Icon from "./Icon.vue";
export default {
  components: { Icon },
  name: "barrageItem",
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => ({})
    },
    definstyle: {
      type: Object,
      default: () => ({})
    },
    jumpLinkFlag: {
      type: Boolean,
      default: false
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
      if (this.jumpLinkFlag && href) {
        window.location.href = href;
        this.$emit("close");
      } else {
        this.isPause = !this.isPause;
      }
    }
  },
  computed: {
    isMyBarrage() {
      return this.item.type === BarrageType.MYBARRAGE;
    },
    bindBraageItemStyle() {
      const { delay, top, color, args } = this.item;
      return {
        "--runTime": delay,
        "--offsetWidth": `-${args.offsetWidth}px`,
        top,
        color
      };
    },
    bindStyle() {
      const userBarrageStyle =
        this.item?.type === BarrageType.MYBARRAGE ? this.definstyle : {};
      return {
        ...this.bindBraageItemStyle,
        ...userBarrageStyle
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
.common {
  background-color: rgba(0, 0, 0, 0.3);
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