// components/dashBoard/essay/essay.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    validator: {
      type: Object,
      value: {
        type: '',
        re: null
      }
    }
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
    onTypeChange(event) {
      this.properties.validator.type = event.detail.value
    }
  }
})
