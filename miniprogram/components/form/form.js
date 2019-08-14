// components/form/form.js
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
    submitForm() {
      let formData = []
      for (let i in this.properties.formTemp.questions) {
        formData.push(this.selectComponent(`#question-${i}`).properties.input)
      }
      console.log(formData)
    }
  }
})
