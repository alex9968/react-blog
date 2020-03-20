import React, { useState, useEffect } from 'react'
import { Input, Button, Icon, message, Row, Col } from 'antd'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import loginState from '~/http/sessions'
import { myNotification } from '~/http/self'
import request from '~/utils/request'
import { getLoginState, viewSetIn } from '%view'

const Login = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const view = useSelector(state => state.view)
  const _loginState = getLoginState(view)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    // if (_loginState === true) {
    //   router.push('/my/account')
    // }
  }, [_loginState, router])

  const isLoginByPassword = () => {
    return view.getIn(['login', 'method'], '') === 'password'
  }

  const postLogin = param => request.post('users/sign_in', param)

  const login = (u, l, method = 'password') =>
    method === 'mobileCode'
      ? postLogin({
        email_or_mobile: u.trim(),
        code: l.trim()
      })
      : postLogin({
        email_or_mobile: u.trim(),
        password: l.trim()
      })

  // TODO fix，不应该传code，暂时这么做
  const submit = (code = '') => {
    const { emailOrMobileOrUsername, password, mobile, method } = view.get('login').toJS()
    let u
    let l
    if (isLoginByPassword()) {
      if (emailOrMobileOrUsername === '' || password === '') {
        message.info('请输入账号和密码后登录')
        return
      }
      u = emailOrMobileOrUsername
      l = password
    } else {
      u = mobile
      l = code
    }

    setSubmitting(true)
    login(u, l, method)
      .then(res => {
        console.info(res)
        if (res) {
          router.push('/my/account')
        } else {
          message.info('failed')
        }
        setSubmitting(false)
      })
      .finally(() => setSubmitting(false))
  }

  const { emailOrMobileOrUsername, password, mobile } = view.get('login').toJS()

  const onKeyPress = e => {
    if (e.key === 'Enter') {
      submit()
    }
  }

return (
  <div style={{ minHeight: '81vh' }}>
    <Col  xs={{ span:20, push: 2 }} md={{ span: 8, push: 8 }} lg={{ span: 6, push: 9 }} style={{ marginTop: 60 }}>
      <Row className="FS-12 MB-20 TA-C">
        <span style={{ color: '#8c0000' }}>账号登录</span>
      </Row>
      <Row>
        <Input
          size="large"
          type="text"
          placeholder="邮箱"
          autoFocus
          className="H-21"
          value={emailOrMobileOrUsername}
          onChange={e => dispatch(viewSetIn(['login', 'emailOrMobileOrUsername'], e.target.value))}
          onKeyPress={e => onKeyPress(e)}
        />
        <Input
          size="large"
          type="password"
          placeholder="密码"
          className="MT-12 H-21"
          value={password}
          onChange={e => dispatch(viewSetIn(['login', 'password'], e.target.value))}
          onKeyPress={e => onKeyPress(e)}
        />
        <div className="MT-22">
          <Button className="H-21" type="primary" size="large" loading={submitting} onClick={() => submit()} style={{ width: '100%' }}>
            登录
          </Button>
        </div>
      </Row>

      <Row className="FS-6 MB-20">
        <Col span={12} push={12} className="TA-C MT-10 C-P TA-R">
          <span  style={{ color: 'grey' }} onClick={() => router.push('/signup')}>
           忘记密码
          </span>
        </Col>
      </Row>

    </Col>
    <style jsx>
      {`
          .login-header {
            width: 100%;
            height: 150px;
            margin-top: -120px;
            margin-bottom: -30px;
          }
      `}
    </style>
  </div>
)
}

export default Login

