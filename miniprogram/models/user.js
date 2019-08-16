import { HTTP } from '../utils/http.js'
import { makePromise } from '../utils/makePromise.js'

class UserModel {
  constructor() {
    this.http = new HTTP()
  }
  async login() {
    const loginPromise = await makePromise(wx.login)

    let res = await this.http.request({
      url: '/wx_login',
      data: {
        code: loginPromise.code
      },
      method: 'POST',
    })
    HTTP.openId = res.open_id
    return HTTP.openId
  }
  async getUserInfo() {
    const _promise = await makePromise(wx.getUserInfo)
    
  }
}

export {UserModel}
