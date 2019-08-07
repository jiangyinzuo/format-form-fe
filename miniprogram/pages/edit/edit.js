// miniprogram/pages/edit/edit.js
import { deepClone } from '../../utils/deepClone.js'
import { FormTempModel } from '../../models/formTemp.js'

Page({
  data: {
    questionArr: [],
    showDashBoard: false,
    title: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  addQuestion(event) {
    if (event.detail.type === 'essay') {
      this.data.questionArr.push(null)
      this.setData({
        questionArr: this.data.questionArr
      })
    }
  },
  delQuestion(event) { //TODO: add del btn in html
    console.log(event)
    this.data.questionArr.splice(event.detail.type-1, 1)
    this.setData({
      questionArr: this.data.questionArr
    })
  },
  editQuestion() {
    this.setData({
      showDashBoard: true
    })
  },
  backToPage(event) {
    let questionInfo = deepClone(event.detail.questionInfo)
    this.data.questionArr.push(questionInfo)
    this.setData({
      showDashBoard: false,
      questionArr: this.data.questionArr
    })
    console.log(questionInfo)
  },
  async onSaveTemp() {
    let params = {}  //send to backend
    //params.open_id = 
    let formTempModel = new FormTempModel()
    let res = await formTempModel.sendFormTemp({
      title: this.data.title,
      questions: this.data.questionArr
    })
    wx.showToast({
      title: '保存成功',
    })
    console.log(res)
  },
  onEditTitle(event) {
    this.data.title = event.detail.value
  },
  onBack() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  }
})