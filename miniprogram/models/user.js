import { HTTP } from '../utils/http.js'
import { makePromise } from '../utils/makePromise.js'

class UserModel {
  constructor() {
    this.http = new HTTP()
  }
  async login() {
    const loginPromise = await makePromise(wx.login)
    HTTP.openId = await this.http.request({
      url: '/wx_login',
      data: {
        code: loginPromise.code
      },
      method: 'POST',
    })
    return HTTP.openId
  }
}

export {UserModel}