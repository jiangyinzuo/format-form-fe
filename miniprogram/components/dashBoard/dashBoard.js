// components/dashBoard/dashBoard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    questionInfo: {
      type: Object,
      value: {
        desc: '',
        type: 'radio',
        necessary: 'yes',
        detail: ['', '']
      }
    },
    openWith: {
      type: Number,
      value: -1
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
    formValidate() {
      if (this.properties.questionInfo.desc == '') {
        wx.showToast({
          title: '请输入问题描述',
          icon: 'none'
        })
        return false
      }
      if (this.properties.questionInfo.type === 'essay') {
        this.properties.questionInfo.detail = this.selectComponent('#questionInfo').properties.validator
      } else {
        this.properties.questionInfo.detail = this.selectComponent('#questionInfo').properties.radioList
        for (let idx in this.properties.questionInfo.detail) {
          if (this.properties.questionInfo.detail[idx] == '') {
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
      this.properties.questionInfo.desc = event.detail.value
    },
    onNecessaryChange(event) {
      this.properties.questionInfo.necessary = event.detail.value
    },
    onTypeChange(event) {
      const _lastType = this.properties.questionInfo.type
      this.properties.questionInfo.type = event.detail.value
      if (_lastType === 'essay' || this.properties.questionInfo.type === 'essay') {
        this.setData({
          questionInfo: this.properties.questionInfo
        })
      }
    },
    onCancel() {
      this.triggerEvent('backToPage', {}, {})
    },
    onSave() {
      if (this.formValidate()) {
        this.triggerEvent('backToPage', {
          questionInfo: this.properties.questionInfo,
          openWith: this.properties.openWith
        }, {})
      } 
    }
  }
})
