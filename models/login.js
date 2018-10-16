import { HTTP } from '../util/http-p.js'

class LoginModel extends HTTP {
  getToken(account, secret){
    return this.request({
      url: 'token',
      data: {
        account: account,
        secret: secret,
        type: 100
      },
      method: 'POST',
    })
  }
}

export { LoginModel }