import {HTTP} from '../utils/http.js'
import {makePromise} from '../utils/makePromise.js'

class UserModel {
  constructor() {
    this.http = new HTTP()
  }
  static openId = null
  async login() {
    const loginPromise = await makePromise(wx.login)
    UserModel.openId = await this.http.request({
      url: '/wx_login',
      data: {
        code: loginPromise.code
      },
      method: 'POST',
    })
    return UserModel.openId
  }
}

export {UserModel}