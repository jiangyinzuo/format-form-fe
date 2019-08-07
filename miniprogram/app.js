//app.js
import {
  config
} from './config.js'
import {
  UserModel
} from './models/user.js'

let user = new UserModel()

App({
  async onLaunch() {
    await user.login()
    console.log(UserModel.openId)
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