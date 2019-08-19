// miniprogram/pages/fillIn/fillIn.js
import { FormTempModel } from '../../models/formTemp.js'
import { UserModel } from '../../models/user.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formTempId: '',
    formTemp: {},
    openId: '',
    _filled: false,
    noForm: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const formTemp = new FormTempModel()
    const userModel = new UserModel()
    wx.showLoading({
      title: '加载中',
    })
    const res = await formTemp.getOneFormTempById(options.id)
    if (res.err_code === 5101) {
      this.setData({
        noForm: true
      })
    }
    const openId = await userModel.login()
    this.setData({
      formTempId: options.id,
      formTemp: res.form_temp,
      openId: openId
    })
    wx.hideLoading()
    console.log('formTemp', this.data.formTemp)
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

  _onFilled() {
    this.setData({
      _filled: true
    })
  },
  fillInOneMore(){
    this.setData({
      _filled: false
    })
  },
  redirectToIndex() {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})