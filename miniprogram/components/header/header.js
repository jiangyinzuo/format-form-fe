// components/header/header.js
import {UserModel} from '../../models/user.js'

const userModel = new UserModel()

Component({
  
  lifetimes: {
    async attached() {
      if (UserModel.userInfo === undefined) {
        const _promise = await userModel.getUserInfo()
      }
      if (UserModel.userInfo !== undefined) {
        this.showUserInfo(UserModel.userInfo)
      }
    }
  },
  properties: {
    userInfo: {
      type: Object,
      value: {
        avatarUrl: '../../static/icon/avatar.svg',
        intro: '点击授权登录'
      }
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
    async _getUserInfo() {
      if (UserModel.userInfo === undefined) {
        await userModel.getUserInfo()
        this.showUserInfo(UserModel.userInfo)
      }
    },
    showUserInfo(userInfo) {
      this.setData({
        userInfo: {
          avatarUrl: userInfo.avatarUrl,
          intro: userInfo.nickName
        }
      })
    }
  }
})
