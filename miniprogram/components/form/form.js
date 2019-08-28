// components/form/form.js
import { FormDataModel } from '../../models/formData.js'

let formDataModel = new FormDataModel()
Component({
  /**
   * @param {string} openId - openid of user, values 'preview' for preview scene. 
   */
  properties: {
    formTemp: Object,
    enabled: Boolean,
    openId: String
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
      let formTypes = []
      for (let i in this.properties.formTemp.questions) {
        formTypes.push(this.properties.formTemp.questions[i].type)
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
      
      
      if (this.properties.enabled) {
        wx.showNavigationBarLoading()
        let res = await formDataModel.postFormData({
          open_id: this.properties.openId,
          object_id: this.properties.formTemp._id,
          form_data: formData,
          form_types: formTypes
        }).finally(
          wx.hideNavigationBarLoading()
        )
        console.log(res)
        if (res.err_code === 0) {
          this.triggerEvent('filled', {}, {})
        }
      } else {
        wx.showToast({
          title: '数据验证成功'
        })
      }
      
    }
  }
})
