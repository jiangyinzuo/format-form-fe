// components/formBoard/formBoard.js
import {FormTempModel} from '../../models/formTemp.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    form: Object
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
    
    showDetail() {
      const formTempModel = new FormTempModel()
      formTempModel.saveFormTempDataFromIndex(this.properties.form)
    }
  }
})
