<template>
  <div class="barrage">
    <div class="barrage-container" ref="barrageContainer">
      <div class="barrage-half-screen" ref="halfScreenContainer">
        <template v-for="item in filterList.level1">
          <BarrageItem
            :definstyle="definStyle"
            :jumpLinkFlag="jumpLinkFlag"
            :class="{'pauseAnimation' : pauseFlag}"
            :item="item"
            :key="item.id"
            @close="close"
            @save="saveClientWidth"
            @destory="destoryBraageItem"
          />
        </template>
      </div>
      <div class="barrage-full-screen" v-if="fullScreen">
        <template v-for="item in filterList.level2">
          <BarrageItem
            :definstyle="definStyle"
            :jumpLinkFlag="jumpLinkFlag"
            :class="{'pauseAnimation' : pauseFlag}"
            :item="item"
            :key="item.id"
            @close="close"
            @save="saveClientWidth"
            @destory="destoryBraageItem"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import BarrageItem from "./components/barrageItem.vue";
import { barrageLevel } from "./constant/index.js";
import { BarrageManager } from "./js/index.js";
export default {
  name: "miniVueBarrage",
  components: { BarrageItem },
  props: {
    // 弹幕数组
    barrages: {
      type: Array,
      default: [],
      required: true
    },
    // 弹幕的弹道 ，可使每条弹幕在对应的弹道中 不重复 叠加（相当于你的弹幕盒子高度计算）
    rows: {
      type: Number,
      default: 8
    },
    // 你是否需要全屏弹幕
    fullScreen: {
      type: Boolean,
      default: false
    },
    //你希望弹幕需要多少秒滚动一屏,弹幕文组滑过容器的时间
    delay: {
      type: Number,
      default: 8
    },
    // 你希望每多少秒创建一次弹幕
    createTime: {
      type: Number,
      default: 1
    },
    // 发布弹幕的字数控制
    barrageLen: {
      type: Number,
      default: 20
    },
    // 是否需要批量销毁弹幕
    isBatchDestory: {
      type: Boolean,
      default: false
    },
    batchDestoryNum: {
      type: Number,
      default: 10
    },
    //是否需要点击链接后跳转页面
    jumpLinkFlag: {
      type: Boolean,
      default: true
    },
    // 用户自己发布的弹幕的样式,可配置
    definStyle: {
      type: Object,
      default: () => ({})
    },
    barrageTypeCallback: {
      type: Function
    }
  },
  created() {
    this.barrageManager = new BarrageManager(this);
  },
  mounted() {
    // 初始化弹幕渲染数据
    this.init();
  },
  data() {
    return {
      barrageManager: null,
      currentRow: 0, // 当前弹幕在第几行生成
      pauseFlag: false
    };
  },
  methods: {
    init() {
      this.barrageManager.saveOffsetWidth(this.getBarrageCtnOffsetWidth);
      this.barrageManager.play(this.barrages);
    },
    // 性能优化 ，批量删除dom
    destoryBraageItem({ id }) {
      if (!this.isBatchDestory) return this.barrageManager.deleteBarrage(id);
      // 能走下来就是批量删除
      this.barrageManager.addDeleteIdInQueue(id);
    },
    // 添加弹幕
    add(options) {
      this.barrageManager.addBarrage(
        this.barrageManager.createBarrage(options, true)
      );
    },
    // 重置弹幕
    reset(barrages) {
      this.barrageManager.reset(barrages);
    },
    pause() {
      this.pauseFlag = !this.pauseFlag;
      this.barrageManager.pause();
    },
    close() {
      this.barrageManager.close();
      this.resetState();
    },
    play(barrages) {
      let isRun = this.barrageManager.getBarrageTimer(); // 是否正在运行
      if (isRun) return;
      if (this.barrageManager.getPauseFlag()) {
        this.pauseFlag = !this.pauseFlag;
      }
      this.barrageManager.saveOffsetWidth(this.getBarrageCtnOffsetWidth);
      this.barrageManager.play(barrages);
    },
    resetState() {
      this.pauseFlag = false;
      this.currentRow = 0;
    },
    changeColor(color) {
      this.barrageManager.setDefaultColor(color);
    },
    saveClientWidth(clientWidth) {
      if (this.currentRow >= this.rows / 2) {
        this.currentRow = 0;
      }
      this.barrageManager.saveBarrageItemClientWidth(
        clientWidth,
        this.currentRow
      );
      this.currentRow = this.currentRow + 1;
    }
  },
  computed: {
    filterList() {
      return {
        level1:
          this.barrageManager
            .getBarrageList()
            .filter(item => item.level === barrageLevel.LEVEL1) || [],
        level2:
          this.barrageManager
            .getBarrageList()
            .filter(item => item.level === barrageLevel.LEVEL2) || []
      };
    },
    // 获取弹幕容器高度
    getBarrageContainerClientHeight() {
      return this.$refs.barrageContainer.clientHeight;
    },
    // 获取容器的宽度
    getBarrageCtnOffsetWidth() {
      return this.$refs.barrageContainer.offsetWidth;
    },
    // 根据弹道数量 计算弹道高度
    rowHeight() {
      let barrageContainerClientHeight = this.getBarrageContainerClientHeight;
      let barrageClientHeight = this.fullScreen
        ? barrageContainerClientHeight
        : barrageContainerClientHeight / 2;
      // 根据是否需要全屏 计算弹道高度  ， 如果是全屏弹幕，那就是整个弹幕容器高度，否则则是弹幕容器的一半高度
      return parseInt(
        barrageClientHeight / (this.fullScreen ? this.rows : this.rows / 2)
      );
    }
  },
  destroyed() {
    this.barrageManager.close();
  }
};
</script>

<style lang="less" scoped>
.barrage {
  height: 500px;
  width: 800px;
  background-image: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  margin: 0 auto;
  .barrage-container {
    position: relative;
    height: 100%;
    width: 100%;
    user-select: none;
    padding: 10px 0px;
    box-sizing: border-box;
    overflow: hidden;
    .barrage-half-screen,
    .barrage-full-screen {
      position: relative;
      // padding: 10px 5px;
      height: 50%;
      box-sizing: border-box;
      .pausedAnimation {
        animation-play-state: paused !important;
      }
    }
    .pauseAnimation {
      animation-play-state: paused;
    }
  }
  .send {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 100%;
    margin-left: 14px;
  }
}
</style>