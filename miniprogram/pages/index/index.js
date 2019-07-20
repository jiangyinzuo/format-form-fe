//index.js
const app = getApp()

Page({
  navigateTo: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url,
    })
  }
})