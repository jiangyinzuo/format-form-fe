// components/dashBoard/radio/radio.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    radioList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    itemDesc: '',
    order: ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. ', 'G. ', 'H. ', 'I. ', 'J. ', 'K. ', 'L. ', 'M. ', 'N. ', 'O. ', 'P. ', 'Q. ', 'R. ', 'S. ', 'T. ', 'U. ', 'V. ', 'W. ', 'X. ', 'Y. ', 'Z. '],
    showAddBtn: true
  },

  methods: {
    addRadio() {
      if (this.data.itemDesc) {
        this.properties.radioList.push(this.data.itemDesc)
        this.setData({
          itemDesc: '',
          radioList: this.properties.radioList
        })
      }
      if (this.properties.radioList.length >= 26) {
        this.setData({
          showAddBtn: false
        })
      }
    },
    onDescInput(event) {
      this.data.itemDesc = event.detail.value
    },
    delRadio(event) {
      this.data.radioList.splice(event.target.dataset.idx, 1)
      this.setData({
        radioList: this.data.radioList
      })
    }
  }
})
