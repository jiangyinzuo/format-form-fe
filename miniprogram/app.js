//app.js
App({
  onLaunch: function () {
    let appInstance = this
    wx.getUserInfo({
      success: function (res) {
        appInstance.globalData.userInfo = res.userInfo
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
