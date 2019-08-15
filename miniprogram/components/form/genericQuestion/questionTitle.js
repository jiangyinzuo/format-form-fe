// components/genericQuestion/questionTitle.js
Component({
  lifetimes: {
    attached() {
      console.log('order', this.properties.order)
      console.log('necessary', this.properties.necessary)
    }
  },
  properties: {
    title: String,
    order: Number,
    necessary: String
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
