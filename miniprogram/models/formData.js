import { HTTP } from '../utils/http.js'

class FormDataModel {
  constructor() {
    this.http = new HTTP()
  }
  async postFormData({
    open_id,
    object_id,
    form_data
  }) {
    return this.http.request({
      url: '/form_data',
      data: {
        open_id: open_id,
        object_id: object_id,
        form_data: form_data
      },
      method: 'POST'
    })
  }
}

export { FormDataModel }