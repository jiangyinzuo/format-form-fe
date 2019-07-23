//index.js
let app = getApp()

Page({
  onShow: function () {
    this.getUserInfo()
  },
  data: {
    intro: '点击头像授权登录',
    avatarUrl: '../../static/avatar.svg'
  },
  getUserInfo: function (event) {
    if (app.globalData.userInfo === null) {
      wx.getUserInfo({
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          if (event !== undefined) {
            this.navigateTo(event)
          }
          this.updateUserInfo()
        }
      })
    } else {
      if (event!==undefined) {
        this.navigateTo(event)
      }
      this.updateUserInfo()
    }
  },
  navigateTo: function (event) {
    if (event.currentTarget.dataset.url) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
    }
  },
  updateUserInfo: function () {
    if(app.globalData.userInfo){
      console.log(app.globalData.userInfo)
      this.setData({
        intro: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl
      })
    }
  }
})