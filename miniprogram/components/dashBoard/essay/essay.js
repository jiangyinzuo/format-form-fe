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
    showCustomRe: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onReInput(event) {
      this.properties.validator.re = event.detail.value
    },
    onTypeChange(event) {
      this.properties.validator.type = event.detail.value
    }
  }
})
