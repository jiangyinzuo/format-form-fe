import { HTTP } from '../utils/http.js'
import {makePromise} from '../utils/makePromise.js'
import {config} from '../config.js'

class LaunchedFormsModel{
  constructor() {
    this.http = new HTTP()
  }
  async putLaunchedForm({
    form_temp_id,
    title,
    type,
    show_select_res,
    repeat_filling,
    start_time,
    end_time,
    questions
  }) {
    return await this.http.request({
      url: '/launched_forms',
      data: {
        form_temp_id,
        open_id: HTTP.openId,
        title: title,
        type: type,
        questions: questions,
        show_select_res: show_select_res,
        repeat_filling: repeat_filling,
        start_time: start_time,
        end_time: end_time
      },
      method: 'PUT'
    })
  }
  async putLaunchedFormsStatus({
    form_temp_id,
    end_time,
    type
  }) {
    /**
     * delay the end time of the form. If param `dateTime` equals to 'now', type of the form will become 'ended'.
     */
    return await this.http.request({
      url: '/launched_forms/status',
      method: 'PUT',
      data: {
        open_id: HTTP.openId,
        form_temp_id,
        end_time,
        type
      }
    })
  }
  async delLaunchedForm(_id) {
    console.log(_id)
    return await this.http.request({
      url: '/launched_forms',
      data: {
        open_id: HTTP.openId,
        _id: _id,  // _id is mongodb's objectId
      },
      method: 'DELETE'
    })
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
      url: '/launched_forms',
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
      url: '/launched_forms',
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
  async exportExcel(form_id) {
    const res = await makePromise(wx.downloadFile, {
      url: `${config.API_BASE_URL}/launched_forms/excel?open_id=${HTTP.openId}&form_id=${form_id}`,
      statusCode: 200
    })
    
    const f = await makePromise(wx.openDocument, {
      filePath: res.tempFilePath,
      fileType: 'xlsx'
    })

  }
}

export { LaunchedFormsModel }