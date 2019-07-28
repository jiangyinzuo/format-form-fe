import {HTTP} from '../utils/http.js'
import {makePromise} from '../utils/makePromise.js'

class UserModel {
  constructor() {
    this.http = new HTTP()
  }
  static openid = null
  async login() {
    const loginPromise = await makePromise(wx.login)
    UserModel.openid = await this.http.request({
      url: '/wx_login',
      data: {
        code: loginPromise.code
      },
      method: 'POST',
    })
    return UserModel.openid
  }
}

export {UserModel}