//index.js
let app = getApp()

Page({
  onShow() {
    this.getUserInfo()
  },
  data: {

  },
  getUserInfo(event) {
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
  navigateTo(event) {
    if (event.currentTarget.dataset.url) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
    }
  },
  updateUserInfo() {
    if(app.globalData.userInfo){
      console.log(app.globalData.userInfo)
      this.setData({
        intro: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl
      })
    }
  }
})