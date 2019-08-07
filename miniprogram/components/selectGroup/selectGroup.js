// components/selectGroup/selectGroup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    items: {
      type: Array,
      value: [{
        desc: "foo",
        checked: false
      }, {
        desc: "bar",
        checked: true
      }]
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
    chooseItem(event) {
      let idx = event.target.dataset.idx
      this.properties.items[idx].checked = !this.properties.items[idx].checked
      this.setData({
        "items": this.properties.items
      })
    }
  }
})
