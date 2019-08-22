// components/dropDownList/dropDownList.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: ['全部', '进行中', '已截止', '草稿']
    },
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
        showList: !this.data.showList,
        items: this.properties.items
      })
    },
    refreshItems(items, selected=0) {
      this.setData({
        items,
        selected
      })
      this.triggerEvent('dropListChange', {
        value: this.properties.selected
      }, {
        bubbles: true,
        composed: true
      })
    }
  }
})
