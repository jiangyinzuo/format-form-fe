// components/index/launched/launched.js
import {FormTempModel} from '../../../models/formTemp.js'
import {UserModel} from '../../../models/user.js'
import { InvolvedFormsModel } from '../../../models/involvedForms.js'
import {HTTP} from '../../../utils/http.js'

const formTempModel = new FormTempModel()
const involvedFormsModel = new InvolvedFormsModel()
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
    async getFormArr(type) {
      /**
       * @params {string} type - type of form array, values
       *                         'launched' or 'involved'
       */
      wx.showNavigationBarLoading()

      let res
      console.log(HTTP.openId)
      if (!HTTP.openId) {
        const userModel = new UserModel()
        res = await userModel.loginAndGetLaunchedForm()
      } else if (type === 'launched'){
        res = await formTempModel.getFormTemp()
      } else {
        res = await involvedFormsModel.getInvolvedForms()
      }
      this.data.formFilter = {
        'all': [],
        'underway': [],
        'ended': [],
        'draft': []
      }
      this.data.formFilter['all'] = res.forms
      this.filtFormType(res.forms)
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
