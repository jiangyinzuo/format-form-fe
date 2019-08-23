import { HTTP } from '../utils/http.js'

class FormTempModel {
  
  constructor() {
    this.http = new HTTP()
  }
  async sendFormTemp({
    title,
    type,
    show_select_res,
    repeat_filling,
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
        questions: questions,
        show_select_res: show_select_res,
        repeat_filling: repeat_filling,
        start_time: start_time,
        end_time: end_time
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
}

export { FormTempModel }
