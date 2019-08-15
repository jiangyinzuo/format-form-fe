// components/genericQuestion/customEssay/customEssay.js
import { genericQuestionBehavior } from '../behavior.js'

Component({
  behaviors: [genericQuestionBehavior, ],
  lifetimes: {
    attached() {
      const _KEY_BOARD_TYPE = {
        'text': 'text',
        'integer': 'number',
        'identity': 'idcard',
        'phone': 'number',
        'email': 'text',
        'date': 'date'
      }
      const _RE = {
        'text': '',
        'integer': '^\\d*$',
        'identity': '^[1-68][0-7]\\d{4}(18|19|20|21){1}\\d{2}(0[1-9]|1[0-2]){1}(0[1-9]|(1|2)[0-9]|3[0-1]){1}\\d{3}[0-9X]$',
        'phone': '^\\d{11}$',
        'date': '^\\d{4}-(0[1-9]|1[0-2]){1}-(0[1-9]|(1|2)[0-9]|3[0-1]){1}$',
        'email': '^[a-z0-9A-Z][a-z0-9A-Z._\\-]+@([a-z0-9A-Z]{1}[a-z0-9A-Z_\\-]*\\.{1})+[a-z0-9A-Z]+$'
      }
      const _ERR_MSG = {
        'text': '',
        'integer': '请填写数字',
        'identity': '请输入正确的身份证号',
        'phone': '请输入11位手机号',
        'date': '请输入日期',
        'email': '请输入正确的电子邮箱'
      }
      this.data._re = _RE[this.properties.info.detail]
      this.data._MISMATCHED_ERR = _ERR_MSG[this.properties.info.detail]
      this.setData({
        _inputType: _KEY_BOARD_TYPE[this.properties.info.detail],
      })
    }
  },
  properties: {
    input: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    _inputType: '',
    _re: '',
    _inputStyle: 'regular',
    _MISMATCHED_ERR: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onInput(event) {
      this.properties.input = event.detail.value
      if (this.data._inputType === 'date') {
        this.setData({
          _validate: true,
          _inputStyle: 'regular'
        })
      }
    },
    onFocus() {
      this.setData({
        _inputStyle: 'inputting',
        _validate: true
      })
    },
    _validate() {
      if ( this.properties.info.necessary === 'yes' &&
           this.properties.input === '' ) {
        this.setData({
          _validate: false,
          _inputStyle: 'error',
          _errMsg: '此题不能为空, 请输入'
        })
        return false
      } 
      const r = new RegExp(this.data._re)
      const res = r.test(this.properties.input)
      this.setData({
        _validate: res,
        _inputStyle: res ? 'regular' : 'error',
        _errMsg: this.data._MISMATCHED_ERR
      })
      return res
    },
    _pickerNoData() {
      if (this.properties.info.necessary === 'yes') {
        this.setData({
          _validate: false,
          _inputStyle: 'error',
          _errMsg: '此题不能为空, 请输入'
        })
      }
    }
  }
})
