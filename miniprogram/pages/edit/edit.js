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
  /**
   * @namespace
   * 
   * @property {object} _questionDetail - provide for UI
   * @property {string} _questionDetail.type - type of question
   * @property {string} _questionDetail.desc  - desc of question
   * @property {string} _questionDetail.necessary - necessary of question
   * @property {string, array} _questionDetail.necessary.content
   * 
   * @property {array} questionArr - send to server
   * 
   * @property {string} title - title of the form template
   * @property {object} dashBoardProps - pass it to component 'dash-board-cmp'
   * @property {number} openWith - index of questions to edit, -1 means add new questions.
   */
  data: {
    _questionDetail: [],
    questionArr: [],
    showDashBoard: false,
    title: '',
    formTempId: '',

    /**
     * params passed to compeleted cmp
     */
    showCompeletedPage: false,
    showShareIcon: true,
    compeletedPageTitle: '',

    showConfirm: false,
    _ALPHA_BET: ['A. ', 'B. ', 'C. ', 'D. ', 'E. ', 'F. ', 'G. ', 'H. ', 'I. ', 'J. ', 'K. ', 'L. ', 'M. ', 'N. ', 'O. ', 'P. ', 'Q. ', 'R. ', 'S. ', 'T. '],
    dashBoardProps: {
      desc: '',
      type: 'radio',
      necessary: 'yes',
      detail: ['', '']
    },
    openWith: -1,
    _formTemp: {},
    _showPreview: false,

    // params pass to settings-page-cmp
    showSettings: false,
    repeatFilling: false,
    showSelectRes: true,
    startTime: '',
    endTime: ''
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
      title: this.data.title,
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
      openWith: -1,
      showDashBoard: true,
      dashBoardProps: {
        desc: '',
        type: 'radio',
        necessary: 'yes',
        detail: ['', '']
      }
    })
  },
  editQuestion(event) {
    const _openWith = event.target.dataset.idx
    this.setData({
      openWith: _openWith,
      showDashBoard: true,
      dashBoardProps: this.data.questionArr[_openWith]
    })
  },
  saveQuestion(event) {
    if (event.detail.questionInfo) {
      const questionInfo = deepClone(event.detail.questionInfo)
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
      if (event.detail.openWith === -1) {
        this.data.questionArr.push(questionInfo)
        this.data._questionDetail.push({
          showDetail: false,
          data: _detailInfo
        })
      } else {
        this.data.questionArr[event.detail.openWith] = questionInfo
        this.data._questionDetail[event.detail.openWith] = {
          showDetail: false,
          data: _detailInfo
        }
      }
      this.setData({
        showDashBoard: false,
        _questionDetail: this.data._questionDetail,
        questionArr: this.data.questionArr
      })
      console.log('questionArr:', this.data.questionArr)
      console.log('_questionDetail:', this.data._questionDetail)
    } else {
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
  preview() {
    this.setData({
      _formTemp: {
        questions: this.data.questionArr,
        title: this.data.title,
        type: 'custom',
        _id: 'PREVIEW',
      },
      _showPreview: true
    })
  },
  hidePreview() {
    this.setData({
      _showPreview: false
    })
  },
  async postFormTemp(event) {
    if (this.formValidate()) {
      let params = {}  //send to backend

      let res = await formTempModel.sendFormTemp({
        title: this.data.title,
        questions: this.data.questionArr,
        type: event.target.dataset.formtype,
        show_select_res: this.data.showSelectRes,
        repeat_filling: this.data.repeatFilling,
        start_time: this.data.startTime,
        end_time: this.data.endTime
      })

      console.log(res)
      this.data.formTempId = res.form_temp_id
      this.setData({
        showCompeletedPage: true,
        showShareIcon: event.target.dataset.formtype === 'underway',
        compeletedPageTitle: event.target.dataset.formtype === 'underway' ? '制作成功' : '保存成功'
      })
    }
  },
  onEditTitle(event) {
    this.data.title = event.detail.value
  },
  changeQuestionStatus(event) {
    /* change icon */
    const idx = event.target.dataset.idx
    this.data._questionDetail[idx].showDetail = !this.data._questionDetail[idx].showDetail
    this.setData({
      _questionDetail: this.data._questionDetail
    })
  },
  showSettingsPage() {
    this.setData({
      showSettings: true
    })
  },
  onSettingChanged(event) {
    console.log(event)
    this.setData({
      showSettings: false
    })
    this.data.repeatFilling = event.detail.repeatFilling
    this.data.showSelectRes = event.detail.showSelectRes
    this.data.startTime = event.detail.startTime
    this.data.endTime = event.detail.endTime
  }
})
