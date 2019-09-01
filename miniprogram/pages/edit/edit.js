// miniprogram/pages/edit/edit.js
import { deepClone } from '../../utils/deepClone.js'
import { LaunchedFormsModel } from '../../models/launchedForms.js'
import { FillInStore } from '../fillIn/dataStore.js'
import { EditStore } from './store.js'

let launchedFormsModel = new LaunchedFormsModel()

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
   * @property {string} scece - scene of edit page, values
   * 'create' for creating a new form or 'draft' for editing
   * a launched form
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
   * @property {string} formTempId - form's ObjectId saved in mongodb, used for sharing the form.
   */
  data: {
    scene: 'create',

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

    // params pass to settings-page-cmp
    showSettings: false,
    repeatFilling: false,
    showSelectRes: true,
    startTime: '',
    endTime: ''
  },

  onLoad(options) {
    if (options.scene === 'draft') {
      this.data.scene = 'draft'
      console.log('scene: ', this.data.scene)
      this.data.questionArr = EditStore.form.questions
      this.data.repeatFilling = EditStore.form.repeat_filling
      this.data.showSelectRes = EditStore.form.show_select_res
      this.data.formTempId = EditStore.form._id

      let _questions = []// assigned to this.data._questionDetail
      for (let i in EditStore.form.questions) {
        let _element = {
          data: {
            type: _DETAIL_TYPE[EditStore.form.questions[i].type],
            desc: EditStore.form.questions[i].desc,
            necessary: EditStore.form.questions[i].necessary === 'yes' ? '是否必填: 是' : '是否必填: 否',
            content: EditStore.form.questions[i].type === 'essay' ? `填空类型: ${_ESSAY_TYPE[EditStore.form.questions[i].detail]}` : EditStore.form.questions[i].detail
          },
          showDetail: false
        }
        _questions.push(_element)
      }

      this.setData({
        title: EditStore.form.title,
        startTime: EditStore.form.start_time,
        endTime: EditStore.form.end_time,
        _questionDetail: _questions
      })
    }
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
  showPreview() {
    FillInStore.setFormTemp({
      questions: this.data.questionArr,
      title: this.data.title
    })

    wx.navigateTo({
      url: '/pages/fillIn/fillIn?id=preview',
    })
  },

  async postFormTemp(event) {
    if (this.formValidate()) {
      let params = {}  //send to backend

      let res
      // create or edit the form
      if (this.data.scene === 'create') {
        res = await launchedFormsModel.sendFormTemp({
          title: this.data.title,
          questions: this.data.questionArr,
          type: event.target.dataset.formtype,
          show_select_res: this.data.showSelectRes,
          repeat_filling: this.data.repeatFilling,
          start_time: this.data.startTime,
          end_time: this.data.endTime
        })
      } else if (this.data.scene === 'draft') {
        res = await launchedFormsModel.putLaunchedForm({
          form_temp_id: this.data.formTempId,
          title: this.data.title,
          questions: this.data.questionArr,
          type: event.target.dataset.formtype,
          show_select_res: this.data.showSelectRes,
          repeat_filling: this.data.repeatFilling,
          start_time: this.data.startTime,
          end_time: this.data.endTime
        })
      }

      console.log(res)
      if (res.err_code === 0) {
        this.data.formTempId = res.form_temp_id
        this.setData({
          showCompeletedPage: true,
          showShareIcon: event.target.dataset.formtype === 'underway',
          compeletedPageTitle: event.target.dataset.formtype === 'underway' ? '制作成功' : '保存成功'
        })
      }
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
