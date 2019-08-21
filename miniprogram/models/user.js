import { HTTP } from '../utils/http.js'
import { makePromise } from '../utils/makePromise.js'

class UserModel {
  static userInfo
  constructor() {
    this.http = new HTTP()
  }
  async getLoginCode() {
    const loginPromise = await makePromise(wx.login)
    return loginPromise.code
  }
  async loginAndGetLaunchedForm() {
    const _code = await this.getLoginCode()
    let res = await this.http.request({
      url: '/wx_login',
      data: {
        code: _code
      },
      method: 'POST',
    })
    HTTP.openId = res.open_id
    return res
  }
  async getUserInfo() {
    if (UserModel.userInfo === undefined) {
      const _promise = await makePromise(wx.getUserInfo)
      UserModel.userInfo = _promise.userInfo
    }
    console.log('userInfo', UserModel.userInfo)
    return UserModel.userInfo
  }
}

export {UserModel}
