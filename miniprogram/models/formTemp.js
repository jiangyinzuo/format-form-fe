import { HTTP } from '../utils/http.js'

class FormTempModel {
  static formTempData = {}
  constructor() {
    this.http = new HTTP()
  }
  async sendFormTemp({
    title,
    type,
    score,
    time_limit,
    start_time,
    end_time,
    questions
  }) {
    /**
     * @params {string} type - type of form temp, values in {'underway', 'ended', 'draft'}
     */
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
  saveFormTempDataFromIndex(formData) {
    FormTempModel.formTempData = formData
  }
  getFormTempDataFromDetail() {
    return FormTempModel.formTempData
  }
}

export { FormTempModel }
