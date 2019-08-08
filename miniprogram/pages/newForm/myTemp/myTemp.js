// miniprogram/pages/newForm/myTemp/myTemp.js
import { FormTempModel } from '../../../models/formTemp.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempArr: [],
    showDashBoard: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    let formTempModel = new FormTempModel()
    let res = await formTempModel.getFormTemp()
    this.setData({
      tempArr: res.question_temps
    })
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
      showDashBoard: true
    })
  }
})