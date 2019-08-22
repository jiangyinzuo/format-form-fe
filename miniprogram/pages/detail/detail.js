// miniprogram/pages/detail/detail.js
import { IndexToDetailStore } from '../../dataStore/indexToDetail.js'
import {IndexStore} from '../index/dataStore.js'
import {makePromise} from '../../utils/makePromise.js'

const store = new IndexToDetailStore()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formDetail: {},
    createdAt: '',
    tab: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const detail = store.getFormData()
    const createdAt = new Date(detail.created_at)
    const indexStore = new IndexStore()

    this.setData({
      formDetail: detail,
      createdAt: createdAt.toLocaleString(),
      tab: indexStore.getTab()
    })
    console.log(this.data.formDetail)
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
  async delForm() {
    const _modalPromise = await makePromise(wx.showModal, {
      title: '温馨提示',
      content: '是否删除？',
      confirmText: '删除',
      confirmColor: '#ff0000'
    })

    if (_modalPromise.confirm) {
      wx.showNavigationBarLoading()
      const res = await formTempModel.delFormTemp(this.data.formDetail._id)
      wx.hideNavigationBarLoading()
      console.log(res)
      if (res.error_code === 0) {
        await makePromise(wx.showToast, {
          title: '删除成功',
          icon: 'none',
        })
        setTimeout(()=>{
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 1500)

      } else {
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
    }
  }
})