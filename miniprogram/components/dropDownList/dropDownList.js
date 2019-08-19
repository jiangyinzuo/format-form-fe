// components/dropDownList/dropDownList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: Array,
    selected: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    showList: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeSelection(event) {
      this.setData({
        selected: event.target.dataset.idx,
        showList: false
      })
      this.triggerEvent('dropListChange', {
        value: this.properties.selected
      }, {
        bubbles: true,
        composed: true
      })
    },
    selectItem() {
      this.setData({
        showList: !this.data.showList
      })
      
    }
  }
})
