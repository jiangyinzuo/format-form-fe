// components/tabbar/tabbar.js
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
    chooseLaunched: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSelectTab(event) {
      this.triggerEvent('selectTab', {tab: event.target.dataset.tab}, {})
      this.setData({
        chooseLaunched: event.target.dataset.tab === 'launched'
      })
    }
  }
})
