// components/index/involved/involved.js
import { FormDataModel } from '../../../models/formData.js'

const formDataModel = new FormDataModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
    async getFormArr() {
      wx.showNavigationBarLoading()
      const res = await formDataModel.getFormData()
      
      wx.hideNavigationBarLoading()
      console.log(res)
    }
  }
})
