// components/form/form.js
import { FormDataModel } from '../../models/formData.js'

let formDataModel = new FormDataModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    formTemp: Object
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
    async submitForm() {
      let formData = []
      let _flag = true
      let _errIdx
      for (let i in this.properties.formTemp.questions) {
        const _cmp = this.selectComponent(`#question-${i}`)
        const _input = _cmp.properties.input
        if (!_cmp._validate()) {
          _flag = false
          if (_errIdx === undefined) {
            _errIdx = i
          }
        }
        formData.push(_input)
      }
      if (!_flag) {
        wx.showToast({
          title: '数据填写有误, 请检查',
          icon: 'none'
        })
        console.log(`#question-${_errIdx}`)
        wx.pageScrollTo({
          selector: `#question-${_errIdx}`
        })
        return;
      }
      console.log(formData)

      wx.showNavigationBarLoading()
      let res = await formDataModel.postFormData({
        object_id: this.properties.formTemp._id,
        form_data: formData
      }).finally(
        wx.hideNavigationBarLoading()
      )
      console.log(res)
      if (res.err_code === 0) {
        wx.showToast({
          title: '提交成功'
        })
      }
      
    }
  }
})
