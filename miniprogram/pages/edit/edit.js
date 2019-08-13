// miniprogram/pages/edit/edit.js
import { deepClone } from '../../utils/deepClone.js'
import { FormTempModel } from '../../models/formTemp.js'

let formTempModel = new FormTempModel()

const _ESSAY_TYPE = {
  'text': '文本',
  'integer': '数字',
  'identity': '身份证',
  'date': '日期',
  'email': '邮箱',
  'phone': '手机号'
}

const _DETAIL_TYPE = {
  'radio': '单选',
  'select': '多选',
  'essay': '填空'
}




Page({
  data: {
    /*
     @params _questionDetail: provide for UI [{
       type: String,
       desc: String,
       necessary: String,
       content: String/Array
     }]
     @params questionArr: send to server
     */
    _questionDetail: [],
    questionArr: [],
    showDashBoard: false,
    title: '',
    formTempId: '',
    showSharePage: false,
    showConfirm: false,
    _ALPHA_BET: ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. ', 'G. ', 'H. ', 'I. ', 'J. ', 'K. ', 'L. ', 'M. ', 'N. ', 'O. ', 'P. ', 'Q. ', 'R. ', 'S. ', 'T. ']
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
  onShareAppMessage(res) {
    return {
      title: 'hsgwee' + this.data.formTempId,
      path: `/pages/fillIn/fillIn?id=${this.data.formTempId}`
    }
  },
  delQuestion(event) {
    wx.showModal({
      title: '温馨提示',
      content: '确认删除此问题？',
      showCancel: true,
      confirmText: '删除',
      confirmColor: '#ee0000',
      success: res => {
        if (res.confirm) {
          this.data.questionArr.splice(event.target.dataset.idx, 1)
          this.data._questionDetail.splice(event.target.dataset.idx, 1)
          this.setData({
            _questionDetail: this.data._questionDetail
          })
        }
      }
    })
  },
  addQuestion() {
    this.setData({
      showDashBoard: true
    })
  },
  editQuestion() {
    
    this.setData({
      showDashBoard: true
    })
  },
  saveQuestion(event) {
    if (event.detail.questionInfo) {
      let questionInfo = deepClone(event.detail.questionInfo)
      this.data.questionArr.push(questionInfo)
      let _detailInfo = {
        type: _DETAIL_TYPE[questionInfo.type],
        desc: questionInfo.desc,
        necessary: questionInfo.necessary === 'yes' ? '是否必填: 是' : '是否必填: 否',
        content: null  // Array for radio or select, String for essay.
      }
      if (questionInfo.type === 'essay') {
        let _essay_type = questionInfo.detail
        _detailInfo.content = `填空类型: ${_ESSAY_TYPE[_essay_type]}`
      } else {
        _detailInfo.content = questionInfo.detail
      }
      this.data._questionDetail.push({
        showDetail: false,
        data: _detailInfo
      })

      this.setData({
        showDashBoard: false,
        _questionDetail: this.data._questionDetail
      })
      console.log(this.data.questionArr)
      console.log(this.data._questionDetail)
    }else {
      this.setData({
        showDashBoard: false
      })
    }
  },
  formValidate() {
    let flag = true
    if (this.data.title == '') {
      flag = false
      wx.showToast({
        title: '请输入表单标题',
        icon: 'none'
      })
    }
    return flag
  },
  async onSaveTemp() {
    if (this.formValidate()) {
      let params = {}  //send to backend
      //params.open_id = 
      let res = await formTempModel.sendFormTemp({
        title: this.data.title,
        questions: this.data.questionArr
      })
      wx.showToast({
        title: '保存成功',
      })
      console.log(res)
      this.data.formTempId = res.form_temp_id
      this.setData({
        showSharePage: true
      })
    }
  },
  onEditTitle(event) {
    this.data.title = event.detail.value
  },
  onHiddenSharePage() {
    this.setData({
      showSharePage: false
    })
  },
  changeQuestionStatus(event) {
    /* change icon */
    const idx = event.target.dataset.idx
    this.data._questionDetail[idx].showDetail = !this.data._questionDetail[idx].showDetail
    this.setData({
      _questionDetail: this.data._questionDetail
    })
  }
})
