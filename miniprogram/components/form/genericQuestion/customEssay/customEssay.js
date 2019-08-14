// components/genericQuestion/customEssay/customEssay.js
import { genericQuestionBehavior } from '../behavior.js'

Component({
  behaviors: [genericQuestionBehavior, ],
  lifetimes: {
    attached() {
      const _KEY_BOARD_TYPE = {
        'text': 'text',
        'integer': 'number',
        'identity': 'idcard',
        'phone': 'number',
        'email': 'text',
        'date': 'date'
      }
      this.setData({
        _inputType: _KEY_BOARD_TYPE[this.properties.info.detail]
      })
    }
  },
  properties: {
    input: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    _inputType: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event) {
      this.properties.input = event.detail.value
    }
  }
})
