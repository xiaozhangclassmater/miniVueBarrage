
export class Barrage {
  constructor(barrage) {
    const { id, delay, level, top, url, content, type , color , animationPlayState , ...args } = barrage
    this.id = id;
    this.delay = delay;
    this.level = level;
    this.top = top;
    this.url = url;
    this.content = content;
    this.type = type;
    this.animationPlayState = animationPlayState; // 设计弹幕 是否可 点击暂停功能
    this.color = color;
    this.args = args
  }
}

/**
* 弹幕类的设计 
*   -- 参数设计
*      id ： 每条弹幕的唯一id
*      delay ： 弹幕运行的速度，由外界控制 
*      level ： 弹幕的层级 --> 弹幕可分为设计可分为 上下 1 , 1 两个层级 ，可决定弹幕的显示是全屏还是半屏显示
*      top ：弹幕生成的位置相对于 level 的层级 决定 ，相对于 Level 层级 盒子距离顶部的位置
*      href ：点击弹幕需要跳转的链接
*      content ： 弹幕的内容
*      animationPlayState : 弹幕的 运行的生命周期状态 初始值为 pedding -> index > end  
*      color ：弹幕的颜色 
*         
*/