import { BarrageType } from "../constant";
import { Barrage } from "./barrage";

// 弹幕管理 实体类
export class BarrageManager {
  constructor(barrageVue) {
    this.BarrageVueInstance = barrageVue;
    this.pauseFlag = false;
    this.barrageList = []; // 弹幕数据
    this.cacheSourceBarrageList = []; // 缓存弹幕原始数据
    this.bacthDeleteIds = []; // 所有需要批量删除的对象id
    this.barrageTimer = null; // 定时器
    this.maxDeleteCounter = 0; // 最大删除次数
    this.lastDeleteCounter = 0; // 最后删除次数
    this.currentRow = 0; //当前正在生成弹幕的行
    this.createTotal = 0; // 总共取了多少条
    this.total = 0; // 原始数据总数
    this.jumpLinkFlag = barrageVue.jumpLinkFlag // 是否需要点击弹幕跳转链接
    this.maxRows = barrageVue.rows / 2; // 最大的弹道数量
    this.fullScreen = barrageVue.fullScreen; // 是否全屏弹幕
    this.delay = barrageVue.delay; // 延迟时间 --> 你希望弹幕需要多少秒滚动一屏,弹幕文组滑过容器的时间
    this.createTime = barrageVue.createTime;
    this.isBatchDestory = barrageVue.isBatchDestory // 是否批量删除弹幕
    this.batchDestoryNum = barrageVue.batchDestoryNum; //批量删除的数量
    this.level = 1; // 弹幕等级
    this.top = 0; // ，每一条弹幕相对于自己父盒子的距离
    this.offsetWidth = 0; // 弹幕容器宽度
    this.defaultColor = '#fff';
    this.everyRowsLengths = new Array(this.maxRows).fill(0)
  }

  getBarrageList = () => this.barrageList

  getBarrageTimer = () => this.barrageTimer

  getPauseFlag = () => this.pauseFlag
  /**
   * @param {*} value 
   * @type {string}
   * @description 保存弹幕容器跨度
   */
  saveOffsetWidth = (value) => { this.offsetWidth = value }

  saveBarrageItemClientWidth = (clientWidth, currentRow) => {
    this.everyRowsLengths[currentRow] = this.everyRowsLengths[currentRow] + clientWidth
  }
  setDefaultColor = (value) => { this.defaultColor !== value && (this.defaultColor = value) }

  computedTopValue = (rowIndex = 0) => `${(rowIndex * this.BarrageVueInstance.rowHeight)}px`
  /**
   * 
   * @param {} barrage
   * @description 添加弹幕 
   */

  addBarrage(value) {
    this.barrageList.push(value) // 将创建完成的弹幕对象添加到队列中
  }
  addDeleteIdInQueue(id) {
    this.bacthDeleteIds.push(id)
    this.bacthDeleteHandler()
  }
  /**
   * 
   * @param {弹幕配置对象} barrage 
   * @param {是否是用户创建的弹幕} userCreateBarrage 
   * @returns 
   */
  createBarrage(barrage, userCreateBarrage = false) {
    if (userCreateBarrage) {
      this.currentRow = this.everyRowsLengths.findIndex(cur => cur === Math.min(...this.everyRowsLengths))
      this.top = this.computedTopValue(this.currentRow)
      this.everyRowsLengths[this.currentRow] = this.everyRowsLengths[this.currentRow] + 150
      this.currentRow = this.currentRow + 1
    }
    const options = {
      url: barrage?.url || '',
      color: barrage?.color || this.defaultColor,
      content: barrage?.content || '',
      id: barrage?.id || Date.now(),
      top: barrage?.top || this.top,
      level: barrage?.level || 1,
      imgLink: barrage.imgLink || '',
      delay: barrage?.delay || `${this.delay}s`,
      type: barrage?.type || BarrageType.MYBARRAGE,
      offsetWidth: barrage?.offsetWidth || this.offsetWidth,
      animationPlayState: barrage?.animationPlayState || 'running',
    }
    return new Barrage(options)
  }

  bacthDeleteHandler() {
    // 如果 最大删除数量 为 0 并且 你的 批量删除数组id长度 等于了 余数 那就证明只有余数这么多弹幕待删除
    if (this.maxDeleteCounter === 0 && this.lastDeleteCounter === this.bacthDeleteIds.length) {
      this.batchDelete(0, this.lastDeleteCounter)
      this.lastDeleteCounter = 0
      this.bacthDeleteIds = []
    } else if (this.maxDeleteCounter > 0) {
      if (this.bacthDeleteIds.length !== this.batchDestoryNum) return
      this.batchDelete(0, this.batchDestoryNum)
      this.bacthDeleteIds.splice(0, this.batchDestoryNum)
      this.maxDeleteCounter = this.maxDeleteCounter - 1
    }
  }
  batchDelete(start, count) {
    if (this.barrageList.length === 0) return
    this.barrageList.splice(start, count)

  }
  deleteBarrage(id) {
    const index = this.barrageList.findIndex(item => item.id === id)
    if (index === -1) return
    this.barrageList.splice(index, 1)
  }
  /**
   *
   */
  deleteAllBarrage() {
    this.barrageList = []
  }
  /**
   * @description 定时创建弹幕
   */
  timedCreationBarrage() {
    this.barrageTimer = setInterval(() => {
      if (!this.cacheSourceBarrageList[this.createTotal]) return this.clearTimer(this.barrageTimer) // 如果创建的数量以及大于了总数则清除定时器s;
      this.generateBarrage()
    }, this.createTime * 1000);
  }
  /**
   * @description 生成弹幕数据
   */
  generateBarrage() {
    if (this.currentRow >= this.maxRows) {
      this.currentRow = 0; // 回到初始行
    }
    const barrageItem = this.cacheSourceBarrageList[this.createTotal] // 取出每一个弹幕对象
    // 是全屏弹幕吗 ? 是的话 随机两层 level 1 和 level 2
    this.level = this.fullScreen ? Math.floor(Math.random() * 2) + 1 : 1;
    this.top = this.computedTopValue(this.currentRow); // 计算准确的top
    const assignBarrage = Object.assign(barrageItem, { level: this.level, top: this.top, delay: `${this.delay}s`, offsetWidth: this.offsetWidth })
    const barrageConstructor = this.createBarrage(assignBarrage)
    this.addBarrage(barrageConstructor)
    this.createTotal = this.createTotal + 1
    this.currentRow = this.currentRow + 1
  }
  close() {
    this.clearTimer(this.barrageTimer)
    this.resetData()
  }
  // 开启弹幕
  play(barrages) {
    // 如果没有暂停过 则 走初始化流程
    if (!this.pauseFlag) return this._init(barrages || this.cacheSourceBarrageList)
    // 否则 接着上一次的继续
    this.timedCreationBarrage()

  }
  // 暂停弹幕
  pause() {
    this.clearTimer(this.barrageTimer)
    // 是否暂停过
    this.pauseFlag = true
  }
  reset(barrages) {
    this.close()
    this._init(barrages || this.cacheSourceBarrageList)
  }
  clearTimer(timerId) {
    clearInterval(timerId)
    this.barrageTimer = null
  }
  // 重置数据
  resetData() {
    this.total = 0
    this.createTotal = 0
    this.barrageList = []
    this.maxDeleteCounter = 0
    this.lastDeleteCounter = 0
    this.pauseFlag = false
    this.everyRowsLengths = new Array(this.maxRows).fill(0)
  }

  // 初始化弹幕弹幕数据
  _init(barrageList) {
    // 如果你不是一个数组 或者 你是 数组但长度为 0 则 return
    if (!Array.isArray(barrageList) || (Array.isArray(barrageList) && barrageList.length === 0)) return;
    this.cacheSourceBarrageList = barrageList; // 缓存传入的弹幕数据
    this.total = barrageList.length;
    if (this.isBatchDestory) { // 如果是批量删除的话才计算 次数
      this.maxDeleteCounter = Math.floor(barrageList.length / this.batchDestoryNum); // 计算最大可删除的数量
      this.lastDeleteCounter = barrageList.length % this.batchDestoryNum; // 计算最后一次需要删除的数量
    }
    this.timedCreationBarrage()
  }
}
