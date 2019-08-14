// components/genericQuestion/customRadio/customRadio.js
import { genericQuestionBehavior } from '../behavior.js'

Component({
  behaviors: [genericQuestionBehavior, ],
  properties: {
    input: String
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
    onChooseOption(event) {
      this.properties.input = event.detail.value
    }
  }
})
