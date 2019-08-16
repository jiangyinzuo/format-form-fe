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
    _checked: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelect(event) {
      let _idx = event.currentTarget.dataset.idx
      if (_idx === this.data._checked) {
        this.setData({
          _checked: -1
        })
        this.properties.input = ''
      } else {
        this.setData({
          _checked: _idx,
          _validate: true
        })
        this.properties.input = String(_idx)
      }
      console.log('select', typeof this.properties.input, this.properties.input)
    },
    _validate() {
      if (this.properties.info.necessary === 'yes' &&
        this.properties.input.length === 0) {
        this.setData({
          _validate: false,
        })
        return false
      }
      this.setData({
        _validate: true
      })
      return true
    }
  }
})
