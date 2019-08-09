// miniprogram/pages/newForm/myTemp/myTemp.js
import { FormTempModel } from '../../../models/formTemp.js'

let formTempModel = new FormTempModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempArr: [],
    showDashBoard: false,
    curQuestionIdx: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let res = await formTempModel.getFormTemp()
    this.setData({
      tempArr: res.question_temps
    })
    console.log(this.data.tempArr)
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
  closeDashBoard() {
    this.setData({
      showDashBoard: false
    })
  },
  openDashBoard(event) {
    this.setData({
      showDashBoard: true,
      curQuestionIdx: event.currentTarget.dataset.idx
    })
  },
  async delTemp() {
    let res = await formTempModel.delFormTemp(this.data.tempArr[this.data.curQuestionIdx]._id)
    this.data.tempArr.splice(this.data.curQuestionIdx, 1)
    this.setData({
      showDashBoard: false,
      tempArr: this.data.tempArr
    })
    wx.showToast({
      title: '删除成功',
    })
  }
})