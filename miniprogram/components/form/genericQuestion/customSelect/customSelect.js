import { genericQuestionBehavior } from '../behavior.js'
Component({
  behaviors: [genericQuestionBehavior, ],
  lifetimes: {
    attached() {
      console.log('info:', this.properties.info)
    }
  },
  /**
   * @namespace
   * @property {array} input - user's input, type of it's element is 'string'
   */
  properties: {
    input: Array
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
    onChangeOptions(event) {
      this.properties.input = event.detail.value
      console.log(this.properties.input)
    }
  }
})