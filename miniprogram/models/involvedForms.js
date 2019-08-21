import { HTTP } from '../utils/http.js'

class InvolvedFormsModel {
  constructor() {
    this.http = new HTTP()
  }
  async getInvolvedForms() {
    return await this.http.request({
      url: '/involved_forms',
      method: 'GET',
      data: {
        open_id: HTTP.openId
      }
    })
  }
}

export {InvolvedFormsModel}