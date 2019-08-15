import { HTTP } from '../utils/http.js'

class FormDataModel {
  constructor() {
    this.http = new HTTP()
  }
  async postFormData({
    object_id,
    form_data
  }) {
    return this.http.request({
      url: '/form_data',
      data: {
        object_id: object_id,
        form_data: form_data
      },
      method: 'POST'
    })
  }
}

export { FormDataModel }