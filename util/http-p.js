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
  1000: '输入参数错误',
  1005: 'authorization failed',
  3000: '期刊不存在',
}


// const promise = function (func) {
//     return function (params = {}) {
//         new Promise((resolve, reject) = {
//             args= Object.assign(params, {
//                 success: (res) => {
//                     resolve(res)
//                 },
//                 fail: (error) => {
//                     reject(error)
//                 }
//             })
//             func(args)
//         })
//     }
// }


class HTTP {
  request({
    url,
    data = {},
    method = "GET",
    noRefetch = false
  }) {
    return new Promise(((resolve, reject) => {
      this._request(url, resolve, reject, data, method, noRefetch)
    }))
  }

  // 当noRefech为true时，不做未授权重试机制
  _request(url, resolve, reject, data = {}, method = "GET", noRefetch = true) {
    var that = this
    // console.log('Basic ' + base64_encode(wx.getStorageSync('token') + ':'))
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey,
        'Authorization': 'Basic ' + base64_encode(wx.getStorageSync('token') + ':')
      },
      success: (res) => {
        const code = res.statusCode.toString()
        if (code.startsWith('2')) {
          // console.log(res.data)
          resolve(res.data)
        } else {
          if (code == '401') {
            if (!noRefetch) {
              that._refetch(url, data, method, noRefetch);
            }
          }
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })
  }

  _refetch(param) {
    var token = new Token();
    token.getTokenFromServer((token) => {
      this._request(url, data, method, noRefetch);
    });
  }


  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }


}

export {
  HTTP
}