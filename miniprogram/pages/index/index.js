//index.js
const app = getApp()

Page({
  foo: function () {
    wx.navigateTo({
      url: '../account/account'
    })
  }
})