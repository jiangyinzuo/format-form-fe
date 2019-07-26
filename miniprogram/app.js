//app.js
import {config} from './config.js'
function login() {
  wx.login({
    success: (res) => {
      if (res.code) {
        console.log('login successfully')
        console.log(res)
        wx.request({
          url: config.API_BASE_URL + '/wx_login',
          data: {
            code: res.code,
          },
          method: 'POST',
          success: function (res) {
            console.log(res)
          }
        })
      } else {
        console.log('login failed')
      }
    },
    fail: (err) => {
      console.log('error!')
      console.log(err)
    }
  })
}

App({
  onLaunch: function () {
    login()
    wx.getUserInfo({
      success: (res) => {
        this.globalData.userInfo = res.userInfo
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
