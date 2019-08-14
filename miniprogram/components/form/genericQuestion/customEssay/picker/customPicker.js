// components/form/genericQuestion/customEssay/picker/datePicker.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    mode: String,
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
    onPick(event) {
      this.setData({
        input: event.detail.value
      })
      this.triggerEvent(
        'changeValue', {value: this.properties.input}, {}
      )
    }
  }
})
