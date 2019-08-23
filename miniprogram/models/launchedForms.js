import { HTTP } from '../utils/http.js'

class LaunchedFormsModel{
  constructor() {
    this.http = new HTTP()
  }
  async putLaunchedForms({
    form_temp_id,
    dateTime
  }) {
    /**
     * delay the end time of the form. If param `dateTime` equals to 'now', type of the form will become 'ended'.
     */
    return await this.http.request({
      url: '/launched_forms',
      method: 'PUT',
      data: {
        open_id: HTTP.openId,
        form_temp_id,
        date_time: dateTime
      }
    })
  }
  async delLaunchedForm(_id) {
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
}

export { LaunchedFormsModel }