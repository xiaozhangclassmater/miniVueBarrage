# minivueBarrage

## edition

**npm版本** 

8.5.1
**node 版本** 

`node": ">=6.11.5"`

[中文文档](https://xiaozhangclassmater.github.io/minivueBarrage-docs-web/#/dashboard)

![1689842440686](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00bbb720ed084520adcafaf7a4db96f7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)



如何使用 ？ （How to use it?）

vue2

~~~sh
npm i minivuebarrage 
~~~

或

~~~sh
yarn add minivuebarrage
~~~



## Description（描述）

minivueBarrage is a barrage component developed with the vue framework. It provides barrage resetting, opening, closing and pausing full screen, customizing ICONS, and defining user-published barrage styles, speed colors, and more

## Usage（使用）

This plugin can help you quickly create a pop-up view container, you can specify operations on it, such as pause, reset, open, close and so on, let's see how to use it

`main.js`

~~~js
//全局组件
import miniVueBarrage from 'minivuebarrage'
import 'minivuebarrage/lib/mini-vue-barrage.css'
import Vue from 'vue'

Vue.use(miniVueBarrage)
~~~

or

~~~js
// 局部组件
import { miniVueBarrage } from "minivuebarrage";
import "minivuebarrage/lib/mini-vue-barrage.css";
~~~



`components`

~~~vue
<template>
  <div class="Home">
    <miniVueBarrage class="barrages-ctn" ref='barrage' fullScreen :definStyle='myStyle' :barrages="barrages" />
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
            Icon : '', // 支持 http 链接 or base64字符串 弹幕的icon 默认为 VueIcon
        }]
    };
  },
    computed: {
        myStyle(){
            return { border : '1px solid red' }
        }
    }  
};
</script>

~~~

| 字段(fields) | 类型(type) | 是否必填(require) | 描述(desc)                                                   |
| ------------ | ---------- | ----------------- | ------------------------------------------------------------ |
| content      | string     | true              | 弹幕内容                                                     |
| id           | number     | true              | 弹幕id                                                       |
| type         | string     | true              | 弹幕类型                                                     |
| url          | string     | false             | 决定你跳转的页面                                             |
| className    | string     | false             | 当前弹幕的类名                                               |
| Icon         | string     | false             | 弹幕的icon 支持 http 链接 or base64字符串 弹幕的icon 默认为 VueIcon |

**详解**:

**className** ： 如果你需要给特殊类型的弹幕进行样式定制，那你只需要给当前这条弹幕传入类名，我们会自动绑定该类，你可以在组件外部尽情的更改样式，也许它会对你有帮助（If you need to style a particular type of screen, just pass in the class name for the current screen, we will automatically bind the class, you can change the style outside the component as much as you like, maybe it will help you）

**Icon** ： 如果你需要给弹幕绑定Icon小图标，那你可以在当前弹幕对象中添加该属性，我会帮助你完成渲染，也许它会对你有帮助（If you need to attach a small Icon to a bullet screen, then you can add this property to the current bullet screen object, I will help you finish rendering, maybe it will help you）

### 高级用法

我们对该组件实例本身暴露了以下几个方法（We exposed the following methods to the component instance itself.）。

| 字段(fields) | 组件实例         | type                       | desc         |
| ------------ | ---------------- | -------------------------- | ------------ |
| add          | 实例本身即可调用 | function(barrageItme){}    | 添加弹幕     |
| reset        | 实例本身即可调用 | function(){}               | 重置弹幕     |
| pause        | 实例本身即可调用 | function(){}               | 暂停弹幕     |
| close        | 实例本身即可调用 | function(){}               | 关闭弹幕     |
| play         | 实例本身即可调用 | function(){}               | 开启运行弹幕 |
| changeColor  | 实例本身即可调用 | function(color : string){} | 更改弹幕颜色 |

`add`

~~~js
  add(e) {
      // this.value 代表输入的弹幕值
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
      // this.color 代表选择的颜色字符串 比如:'#000000'
      this.$refs.barrage.changeColor(this.color);
 }
~~~

`close`

~~~js
 close() {
      this.$refs.barrage.close();
 }	,
~~~

### **参数列表**（Parameter list）

| props           | type        | default | isRrquire | desc                                                |
| --------------- | ----------- | ------- | --------- | --------------------------------------------------- |
| barrages        | Array \| [] | []      | true      | 弹幕数组                                            |
| rows            | Number      | 8       | false     | 弹幕的弹道 ，可使每条弹幕在对应的弹道中 不重复 叠加 |
| fullScreen      | Boolean     | false   | false     | 你是否需要全屏弹幕                                  |
| createTime      | Number      | 1s      | false     | 你希望每多少秒创建一次弹幕                          |
| delay           | Number      | 8s      | false     | 你希望弹幕需要多少秒滚动一屏,弹幕文组滑过容器的时间 |                            |
| isBatchDestory  | Boolean     | false   | false     | 是否需要批量销毁弹幕                                |
| batchDestoryNum | Number      | 10      | false     | 每次批量销毁的弹幕数量                              |
| definStyle      | Object      | {}      | false     | 用户自己发布的弹幕的样式,可配置                     |
| jumpLinkFlag    | Boolean     | false   | false     | 是否需要点击链接后跳转页面                          |

