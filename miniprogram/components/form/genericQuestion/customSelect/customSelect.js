import { genericQuestionBehavior } from '../behavior.js'
Component({
  behaviors: [genericQuestionBehavior, ],
  lifetimes: {
    attached() {
      console.log('info:', this.properties.info)
    }
  },
  properties: {
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
