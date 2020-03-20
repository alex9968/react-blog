import { message } from 'antd'
import request from '../utils/request'
import { viewSetIn } from '../redux/modules/view'

const HttpState = {
  UNKNOWN: 'UNKNOWN',
  REQUESTING: 'REQUESTING',
  REQUESTED: 'REQUESTED'
}
const loginState = () => (D, S) => {
  const { view } = S()
  const statePath = ['loginState', 'state']
  if (view.getIn(statePath) !== HttpState.REQUESTING) {
    D(viewSetIn(statePath, HttpState.REQUESTING))
    return request
      .post('users/verifications/refresh_token')
      .then(body => {
        const { ok, error } = body
        if (ok === true) {
          message.info('已登录')
        }
        if (error !== undefined) {
          D(viewSetIn(['loginState', 'result', 'ok'], false))
          request.setAuthorization('')
        } else {
          D(viewSetIn(['loginState', 'result', 'ok'], true))
        }
      })
      .finally(() => {
        D(viewSetIn(statePath, HttpState.REQUESTED))
      })
  }
  return false
}

export default loginState
