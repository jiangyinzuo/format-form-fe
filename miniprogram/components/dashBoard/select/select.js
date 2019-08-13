// components/dashBoard/radio/radio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radioList: {
      type: Array,
      value: ['', '']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    order: ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. ', 'G. ', 'H. ', 'I. ', 'J. ', 'K. ', 'L. ', 'M. ', 'N. ', 'O. ', 'P. ', 'Q. ', 'R. ', 'S. ', 'T. '],
    showAddBtn: true
  },

  methods: {
    addRadio() {
      if (this.properties.radioList.length >= 20) {
        wx.showToast({
          title: '选项不能多于20个',
          icon: 'none'
        })
      } else {
        this.properties.radioList.push('')
        this.setData({
          radioList: this.properties.radioList
        })
      }
    },
    onDescInput(event) {
      console.log(event)
      let idx = event.target.dataset.idx
      this.properties.radioList[idx] = event.detail.value
    }, 
    delRadio(event) {
      if (this.data.radioList.length <= 2) {
        wx.showToast({
          title: '选项不能少于2个',
          icon: 'none'
        })
      } else {
        this.data.radioList.splice(event.target.dataset.idx, 1)
        this.setData({
          radioList: this.data.radioList
        })
      }
    }
  }
})
