import { HTTP } from '../utils/http.js'

class LaunchedForms{
  constructor() {
    this.http = new HTTP()
  }
  async patchLaunchedForms({
    form_temp_id,
    dateTime
  }) {
    /**
     * delay the end time of the form. If param `dateTime` equals to 'now', type of the form will become 'ended'.
     */
    return await this.http.request({
      url: '/launched_forms',
      method: 'PATCH',
      data: {
        open_id: HTTP.openId,
        form_temp_id,
        date_time
      }
    })
  }
}