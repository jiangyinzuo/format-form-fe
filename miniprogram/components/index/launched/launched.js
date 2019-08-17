// components/index/launched/launched.js
import {FormTempModel} from '../../../models/formTemp.js'
import {UserModel} from '../../../models/user.js'

const formTempModel = new FormTempModel()
Component({
  lifetimes: {

  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    formArr: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async getFormArr() {
      wx.showNavigationBarLoading()
      if (!UserModel.openId) {
        const userModel = new UserModel()
        await userModel.login()
      }
      const res = await formTempModel.getFormTemp()
      this.setData({
        formArr: res.form_temps
      })
      wx.hideNavigationBarLoading()
      console.log(res)
    }
  }
})
