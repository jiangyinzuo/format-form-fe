import { HTTP } from '../utils/http.js'

class FormDataModel {
  constructor() {
    this.http = new HTTP()
  }
  async getFormData() {
    return this.http.request({
      url: '/form_data',
      data: {
        open_id: HTTP.openId
      },
      method: 'GET'
    })
  }
  async postFormData({
    open_id,
    object_id,
    form_data,
    form_types
  }) {
    return this.http.request({
      url: '/form_data',
      data: {
        open_id: open_id,
        object_id: object_id,
        form_data: form_data,
        form_types: form_types
      },
      method: 'POST'
    })
  }
}

export { FormDataModel }