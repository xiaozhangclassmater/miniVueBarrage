
<template>
  <div class="publish-barrage-container" ref="barrageContainer" @touchmove.stop="touchmove($event)">
    <div class="operation-line" ref="operationLine">
      <slot name="user-operatio-left"></slot>
      <div class="barrageinput-contianer">
        <input
          type="text"
          id="barrageinput"
          ref="barrageinput"
          v-model="barrageContent"
          @focus="focus()"
          @blur="handlePublishBarrageBlur"
          :placeholder="placeholder"
        />
      </div>
      <slot name="user-operatio-right"></slot>
    </div>
  </div>
</template>
<script>
import { sessionStorageField } from "../constant";
export default {
  props: {
    placeholder: {
      type: String,
      default: "来说两句吧~"
    }
  },
  data() {
    return {
      barrageContent: "",
      scrollTop: 0,
      timer: null
    };
  },
  mounted() {
    this.handeliosKeyBoardPrevDetault();
    this.getFocus();
  },
  methods: {
    touchmove(e) {
      e.preventDefault();
    },
    getFocus(refName = "barrageinput") {
      this.$refs[refName].focus();
      this.setBarraageContent();
    },
    // 设置弹幕输入框内容
    setBarraageContent() {
      let sessionBarrageContent = sessionStorage.getItem(
        sessionStorageField.BARRAGECONTENT
      );
      if (!sessionBarrageContent) return;
      this.barrageContent = sessionBarrageContent;
    },
    focus() {
      this.timer = setTimeout(() => this.handleIosInputKeyBoardCover(), 500);
    },
    changeBodyScrollTop(value) {
      document.documentElement
        ? (document.documentElement.scrollTop = value)
        : (document.body.scrollTop = value);
    },
    // 处理ios 输入框获取焦点 页面滑动问题
    handeliosKeyBoardPrevDetault() {
      document.body.addEventListener("focusin", () =>
        this.handelFocusinEvent()
      ),
        document.body.addEventListener("focusout", () =>
          this.handelFocusoutEvent()
        );
    },
    //  处理 ios input 输入框获取焦点被软键盘 覆盖问题
    handleIosInputKeyBoardCover() {
      let ua = navigator.userAgent;
      let inputDistanceTop = this.$refs.barrageinput.getBoundingClientRect()
        .top;
      if (this.ios && window.innerHeight - inputDistanceTop < 200) {
        document.body.style.scrollBehavior = "smooth";
        this.changeBodyScrollTop(document.body.scrollHeight);
      }
    },
    handelFocusinEvent() {
      this.scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
    },
    handelFocusoutEvent() {
      this.changeBodyScrollTop(this.scrollTop);
    },
    // 清除副作用
    clearEffect() {
      clearTimeout(this.timer);
    },
    handlePublishBarrageBlur() {
      this.$emit("onBlur", this.barrageContent);
    }
  },
  computed: {},
  destroyed() {
    this.clearEffect();
  }
};
</script>

<style lang="less" scoped>
.publish-barrage-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  overflow: scroll;
  .operation-line {
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 52px;
    background: #ffffff;
    padding: 0 20px 0 0;
    border-radius: 4px 4px 0 0;
    box-sizing: border-box;
    .barrageinput-contianer {
      display: flex;
      align-items: center;
      flex: 1;
      border-radius: 22px;
      margin-left: 16px;
      height: 34px;
      background: #f4f5f7;
      input {
        width: 90%;
        height: 34px;
        background: #f4f5f7;
        outline: none;
        border: none;
        border-radius: 22px;
        margin-left: 24px;
      }
    }
  }
}
</style>
