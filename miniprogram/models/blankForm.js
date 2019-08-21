import { HTTP } from '../utils/http.js'
import { UserModel } from './user.js'

class BlankFormModel {
  constructor() {
    this.http = new HTTP()
  }
  async loginAndGetBlankForm(_id) {
    const user = new UserModel()
    const code = await user.getLoginCode()
    return this.http.request({
      url: '/blank_form',
      method: 'GET',
      data: {
        object_id: _id,
        code: code
      }
    })
  }
}

export { BlankFormModel }