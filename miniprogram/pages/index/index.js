//index.js 
import {UserModel} from '../../models/user.js'

Page({
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    if (UserModel.userInfo !== undefined) {
      this.showLaunchedForm()
    }
  },
  onShareAppMessage(res) {
    return {
      title: res.target.dataset.title,
      path: `/pages/fillIn/fillIn?id=${res.target.dataset._id}`
    }
  },
  data: {
    tab: 'launched'
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
    if (this.data.tab === 'launched') {
      this.selectComponent('#launched').getFormArr()
    } else {
      // TODO: get my involved form
    }
  },
  showLaunchedForm() {
    this.selectComponent('#launched').getFormArr()
  }
})