//index.js 
Page({
  data: {
    tab: 'create'
  },
  navigateTo(event) {
    if (event.currentTarget.dataset.url) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
    }
  },
  changePage(event) {
    this.setData({
      tab: event.detail.tab
    })
  }
})