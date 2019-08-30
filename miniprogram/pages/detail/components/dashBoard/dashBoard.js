// pages/detail/components/dashBoard/dashBoard.js
Component({
  /**
   * @property {string} formType - denote type of the form, values 'underway', 'ended', 'notstart'
   */
  properties: {
    formType: String,
    scene: String
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
    onTapBtn(event) {
      this.triggerEvent('tapBtn', {btn: event.target.dataset.btn}, {})
    }
  }
})
