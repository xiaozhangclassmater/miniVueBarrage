# minivueBarrage

## 版本

**npm版本** 

8.5.1
**node 版本** 

`>10.0.0`

[中文文档](https://xiaozhangclassmater.github.io/minivueBarrage-docs-web/#/home)

![1689842440686](/assets/1689842440686.png)

如何使用 ？ 

vue2

~~~sh
npm i minivuebarrage 
~~~

或

~~~sh
yarn add minivuebarrage
~~~



## desc（描述）

中文

minivueBarrage 是一款用vue框架开发的弹幕组件，弹幕遵循高可用，高配置，它 提供了弹幕的 重置 开启 关闭 暂停 是否全屏,自定义icon和定义用户发布的弹幕样式 ，速度 颜色等等丰富的功能



## Usage（使用）

This plugin can help you quickly create a pop-up view container, you can specify operations on it, such as pause, reset, open, close and so on, let's see how to use it

`main.js`

~~~js
import miniVueBarrage from 'minivuebarrage'
import 'minivuebarrage/lib/mini-vue-barrage.css'
import Vue from 'vue'

Vue.use(miniVueBarrage)
~~~

`components`

~~~vue
<template>
  <div class="Home">
    <miniVueBarrage class="barrages-ctn" fullScreen :definStyle='myStyle' :barrages="barrages" />
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
        barrages: [{
            content:"Michelle Young", // 弹幕内容
            id:"110000200606013327", // 弹幕id
            type:"common", // 弹幕类型
            url:"", // 决定你跳转的页面 
            imgLink : '', // 支持 http 链接 or base64字符串 弹幕的icon 默认为 VueIcon
        }]
    };
  },
    computed () {
        myStyle(){
            return : { border : '1px solid red' }
        }
    }  
};
</script>

~~~

### 高级用法

我们对该组件实例本身暴露了以下几个方法。

| name        | 组件实例         | type                       | desc         |
| ----------- | ---------------- | -------------------------- | ------------ |
| add         | 实例本身即可调用 | function(barrageItme){}    | 添加弹幕     |
| reset       | 实例本身即可调用 | function(){}               | 重置弹幕     |
| pause       | 实例本身即可调用 | function(){}               | 暂停弹幕     |
| close       | 实例本身即可调用 | function(){}               | 关闭弹幕     |
| play        | 实例本身即可调用 | function(){}               | 开启运行弹幕 |
| changeColor | 实例本身即可调用 | function(color : string){} | 更改弹幕颜色 |

`add`

~~~js
  add(e) {
      if (!this.value.trim()) return;
      this.$refs.barrage.add({
        content: this.value
      });
      this.value = "";
    },
~~~

`changeColor`

~~~JS
 changeColor() {
      this.$refs.barrage.changeColor(this.color);
 }
~~~

`close`

~~~js
 close() {
      this.$refs.barrage.close();
 }	,
~~~

### **入参选项列表**

| props           | type        | default | isRrquire | desc                                                |
| --------------- | ----------- | ------- | --------- | --------------------------------------------------- |
| barrages        | Array \| [] | []      | true      | 弹幕数组                                            |
| rows            | Number      | 8       | false     | 弹幕的弹道 ，可使每条弹幕在对应的弹道中 不重复 叠加 |
| fullScreen      | Boolean     | false   | false     | 你是否需要全屏弹幕                                  |
| createTime      | Number      | 1s      | false     | 你希望每多少秒创建一次弹幕                          |
| delay           | Number      | 8s      | false     | 你希望弹幕需要多少秒滚动一屏,弹幕文组滑过容器的时间 |
| barrageLen      | Number      | 20      | false     | 发布弹幕的字数控制                                  |
| isBatchDestory  | Boolean     | false   | false     | 是否需要批量销毁弹幕                                |
| batchDestoryNum | Number      | 10      | false     | 每次批量销毁的弹幕数量                              |
| definStyle      | Object      | {}      | false     | 用户自己发布的弹幕的样式,可配置                     |
| jumpLinkFlag    | Boolean     | false   | false     | 是否需要点击链接后跳转页面                          |

