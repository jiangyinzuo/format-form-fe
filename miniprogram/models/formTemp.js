import { HTTP } from '../utils/http.js'

class FormTempModel {
  constructor() {
    this.http = new HTTP()
  }
  async sendFormTemp({
    title,
    type='custom',
    score,
    time_limit,
    start_time,
    end_time,
    questions
  }) {
    return await this.http.request({
      url: '/form_templates',
      data: {
        open_id: HTTP.openId,
        title: title,
        type: type,
        questions: questions
      },
      method: 'POST'
    })
  }
  async getFormTemp() {
    return await this.http.request({
      url: '/form_templates',
      data: {
        open_id: HTTP.openId
      },
      method: 'GET'
    })
  }
  async delFormTemp(_id) {
    console.log(_id)
    return await this.http.request({
      url: '/form_templates',
      data: {
        open_id: HTTP.openId,
        _id: _id,  // _id is mongodb's objectId
      },
      method: 'DELETE'
    })
  }
  async getQRcode(_id) {
    return await this.http.request({
      url: '/wx_get_qr_code',
      data: {
        open_id: HTTP.open_id,
        _id: _id // _id is mongodb's objectId
      },
      method: 'POST'
    })
  }
  async getOneFormTempById(_id) {
    return await this.http.request({
      url: '/form_templates',
      method: 'GET',
      data: {
        object_id: _id
      }
    })
  }
}

export { FormTempModel }
