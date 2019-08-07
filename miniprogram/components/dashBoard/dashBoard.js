// components/dashBoard/dashBoard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    mode: 'radio',
    questionInfo: {
      desc: '',
      type: 'radio',
      necessary: 'yes',
      detail: null
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onQuestionDescInput(event) {
      this.data.questionInfo.desc = event.detail.value
    },
    onNecessaryChange(event) {
      this.data.questionInfo.necessary = event.detail.value
    },
    onTypeChange(event) {
      this.setData({
        mode: event.detail.value
      })
      this.data.questionInfo.type = this.data.mode
    },
    onSave() {
      if (this.data.questionInfo.desc) {
        if (this.data.questionInfo.type === 'essay') {
          this.data.questionInfo.detail = this.selectComponent('#questionInfo').properties.validator
        } else {
          this.data.questionInfo.detail = this.selectComponent('#questionInfo').properties.radioList
        }

        this.triggerEvent('backToPage', {
          questionInfo: this.data.questionInfo
        }, {})
      }
    }
  }
})
