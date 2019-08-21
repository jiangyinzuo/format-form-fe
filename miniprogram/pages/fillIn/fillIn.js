// miniprogram/pages/fillIn/fillIn.js
import { BlankFormModel } from '../../models/blankForm.js'
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
    noForm: false,
    errTip: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const blankForm = new BlankFormModel()

    wx.showLoading({
      title: '加载中',
    })
    const res = await blankForm.loginAndGetBlankForm(options.id)
    if (res.err_code === 5101) {
      wx.hideLoading()
      this.setData({
        noForm: true,
        errTip: '表单不存在'
      })
      return
    } else if (res.err_code === 3000) {
      wx.hideLoading()
      this.setData({
        noForm: true,
        errTip: '已填写表单'
      })
      return
    }
    
    this.setData({
      formTempId: options.id,
      formTemp: res.form_temp,
      openId: res.open_id
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