//app.js
import { config } from './config.js'
import { UserModel } from './models/user.js'
import { HTTP } from './utils/http.js'

let user = new UserModel()

App({
  async onLaunch() {
    await user.login()
    console.log(HTTP.openId)
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