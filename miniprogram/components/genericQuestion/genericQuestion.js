// components/genericQuestion/genericQuestion.js
Component({
  lifetimes: {
    attached() {
      console.log(this.properties.info)
    }
  },
  /**
   * @namespace
   * @property {object} info
   * @property {string} desc
   * @property {array, string} detail
   * @property {string} necessary - value could be 'yes' or 'no'
   * @property {string} type
   */
  properties: {
    info: Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
