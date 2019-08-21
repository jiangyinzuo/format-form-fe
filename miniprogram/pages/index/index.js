//index.js 
import {UserModel} from '../../models/user.js'

const FORM_TYPE = [
  'all', 'underway', 'ended', 'draft'
]

Page({
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
    if (UserModel.userInfo !== undefined) {
      this.showLaunchedForm()
    }
  },
  onShareAppMessage(res) {
    return {
      title: res.target.dataset.title,
      path: `/pages/fillIn/fillIn?id=${res.target.dataset._id}`
    }
  },
  data: {
    tab: 'launched',
    formType: 'all'
  },
  navigateTo(event) {
    if (event.currentTarget.dataset.url) {
      wx.navigateTo({
        url: event.currentTarget.dataset.url
      })
    }
  },
  changePage(event) {
    this.setData({
      tab: event.detail.tab
    })
    this.selectComponent('#body').getFormArr(this.data.tab)
  },
  showLaunchedForm() {
    this.selectComponent('#body').getFormArr(this.data.tab)
  },
  changeFormFilter(event) {
    console.log(event)
    this.setData({
      formType: FORM_TYPE[event.detail.value]
    })
    this.selectComponent(`#${this.data.tab}`).filtFormType(null)
  }
})