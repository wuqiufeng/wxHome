import {
  config
} from '../config.js'
import {
  Token
} from 'token.js';
import {
  base64_encode
} from '../util/base64.js'

const tips = {
  1: '抱歉出现了一个错误',
  1005: 'appkey错误',
  3000: '期刊不存在',
}

class HTTP {
  request(params) {
    var that = this

    if (!params.method) {
      params.method = "GET"
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey,
        'Authorization': 'Basic ' + base64_encode(
          wx.getStorageSync('token') + ':')
      },
      success: (res) => {
        let code = res.statusCode.toString()
        // console.log('http')
        if (code.startsWith('2')) {
          console.log(res.data)
          params.success && params.success(res.data)
        } else {
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        this._show_error(1)
      }
    })
  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}