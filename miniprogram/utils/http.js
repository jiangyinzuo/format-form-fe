import {config} from '../config.js'
import {makePromise} from './makePromise.js'

const ERR_MSG = {
  '4001': '未知错误',
  '4002': '请求错误',
  '4003': '抱歉，出现了一个错误'
}

class HTTP {
  request({url, data={}, method='GET'}={}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    }) 
  }

  _request(url, resolve, reject, data={}, method='GET') {
    wx.request({
      url: config.API_BASE_URL + url,
      data: data,
      header: {
        'content-type': 'application/json'
      },
      method: method,
      success: res => {
        const statusCode = res.statusCode.toString()
        if (statusCode.startsWith('2')) {
          resolve(res.data)
        } else {
          this._showErr(res.data.err_code)
          reject(res.data.err_msg ? res.data.err_msg : 'unknown error')
        }
      },
      fail: err => {
        this._showErr('4003')
        reject('request error')
      }
    })
  }

  _showErr(errCode) {
    if (!errCode) {
      errCode = 4001
    }
    wx.showToast({
      title: ERR_MSG[errCode] ? ERR_MSG[errCode] : ERR_MSG[4001],
      duration: 2000,
      icon: 'none'
    })
  }
}

export {HTTP}