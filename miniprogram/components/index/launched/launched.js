// components/index/launched/launched.js
import {FormTempModel} from '../../../models/formTemp.js'
import {UserModel} from '../../../models/user.js'

const formTempModel = new FormTempModel()
Component({
  lifetimes: {

  },
  properties: {
    formType: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    formArr: [],
    formFilter: {
      'all': [],
      'underway': [],
      'ended': [],
      'draft': []
    }
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
      this.data.formFilter = {
        'all': [],
        'underway': [],
        'ended': [],
        'draft': []
      }
      this.data.formFilter['all'] = res.form_temps
      this.filtFormType(res.form_temps)
      wx.hideNavigationBarLoading()
      console.log(res)
    },
    filtFormType(formTemps) {
      if (formTemps !== null) {
       
        for (let i in formTemps) {
          this.data.formFilter[formTemps[i].type].push(formTemps[i])
        }
      }
      this.setData({
        formArr: this.data.formFilter[this.properties.formType]
      })
    }
  }
})
