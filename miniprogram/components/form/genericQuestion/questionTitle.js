// components/genericQuestion/questionTitle.js
Component({
  lifetimes: {
    attached() {
      console.log('order', this.properties.order)
    }
  },
  properties: {
    title: String,
    order: Number
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
