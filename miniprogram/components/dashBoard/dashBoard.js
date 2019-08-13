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
    formValidate() {
      if (this.data.questionInfo.desc == '') {
        wx.showToast({
          title: '请输入问题描述',
          icon: 'none'
        })
        return false
      }
      if (this.data.questionInfo.type === 'essay') {
        this.data.questionInfo.detail = this.selectComponent('#questionInfo').properties.validator
      } else {
        this.data.questionInfo.detail = this.selectComponent('#questionInfo').properties.radioList
        for (let idx in this.data.questionInfo.detail) {
          if (this.data.questionInfo.detail[idx] == '') {
            wx.showToast({
              title: '选项不能为空',
              icon: 'none'
            })
            return false
          }
        }
      }
      return true
    },
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
    onCancel() {
      this.triggerEvent('backToPage', {}, {})
    },
    onSave() {
      if (this.formValidate()) {
        this.triggerEvent('backToPage', {
          questionInfo: this.data.questionInfo
        }, {})
      } 
    }
  }
})
