import _ from 'lodash'
import React from 'react'
import I, { Map } from 'immutable'
import { message as Message } from 'antd'
import Router from 'next/router'
import request from '../utils/request'
//import { selfMerge, selfSet } from '../redux/modules/self'
import { viewSetIn, setFetching, getFetching, setLoggedIn, viewSet } from '../redux/modules/view'
import loginState from './sessions'


export const uploadPhotos = () => (D, S) => {
  const data = JSON.stringify(S().view.get('imgList').toList().toJS())
  const id = S().self.get('id')

  request.post('/photos', { data,id })
    .then(body => {
      if (body.ok) {
        D(viewSetIn(['imgList'], {})) // eslint-disable-line no-use-before-define
        Message.success('保存成功')
      }
    })
}

export const signup = () => (D, S) => {
  const { view } = S()
  return request
    .post('/users', {
      data: view.get('signup')
    })
    .then(body => {
      const { ok, message } = body
      if (ok === false) {
        Message.info(message)
      } else {
        D(loginState())
      }
      D(viewSetIn(['signupLoading'], false))
    })
}


export const setToken = s => D =>
  request.setToken(s).then(() => {
    D(loginState())
  })

export const logout = () => D =>
  Promise.all([request.delete('users/sign_out'), request.setAuthorization('')]).then(() => {
    D(setLoggedIn({ ok: false }))
    D(selfSet(Map()))
    Message.success('已登出')
    Router.push('/')
  })

export const processSignupQuery = query => (D, S) => {
  const { c, email } = query
  const { view } = S()
  D(
    viewSet(
      view.update('signup', s1 =>
        s1.withMutations(s2 => {
          s2.setIn(['settings', 'area'], 'EC')
          if (!_.isEmpty(c)) {
            s2.set('referrer_short_id', c)
          }
          if (!_.isEmpty(email)) {
            const { form } = this.props
            s2.set('email_or_mobile', email)
            form.setFieldsValue({
              email,
              mobile: email
            })
          }
        })
      )
    )
  )
}

export const getUser = shortId => D =>
  request.get('users/name', { short_id: shortId }).then(r => {
    const { data } = r
    D(viewSetIn(['signup', 'settings', 'referrer_name'], data))
  })

export const createAccessToken = deviceType => D =>
  request.post('developers/create_access_token', { for_device_type: deviceType }).then(body => {
    if (body.ok) {
      D(viewSetIn(['tokens'], body.tokens))
    }
  })

export const tokensIndex = () => D =>
  request.get('developers/access_tokens').then(body => {
    if (body.ok) {
      D(viewSetIn(['tokens'], body.tokens))
    }
  })

export const deleteToken = accessToken => D =>
  request.post('developers/remove_access_token', { access_token: accessToken }).then(body => {
    if (body.ok) {
      D(viewSetIn(['tokens'], body.tokens))
    }
  })

export const isUserExist = (value, callback) => () =>
  request
    .post('users/exists_by_any', {
      value
    })
    .then(r => {
      const { exists, message } = r
      if (exists) {
        callback(message)
      }
    })

export const getProjectActives = id => D => {
  // todo push 404
  return request.get('projects/payments_list', { id }).then(body => {
    const { ok, payments } = body
    if (ok) {
      D(viewSetIn(['project', 'actives'], payments))
    }
  })
}



export const updateSelf = () => (D, S) => {
  const { self } = S()
  request.put(`users/profiles/${self.get('id')}`, self.toJS()).then(body => {
    if (body.ok) {
      D(fundingNotification()) // eslint-disable-line no-use-before-define
      Message.success('保存成功')
    }
  })
}

export const changePassword = () => (D, S) => {
  const { self } = S()
  const fields = ['password', 'oldPassword', 'passwordConfirmation']
  request
    .put(`users/passwords`, {
      data: S().self.filter((v, k) => fields.indexOf(k) !== -1)
    })
    .then(body => {
      const { ok, message } = body
      if (ok) {
        D(selfSet(self.deleteAll(fields)))
        D(fundingNotification())
        Message.success(message)
        Router.push('/my/account')
      }
      return ok
    })
    .catch(e => {
      throw e
    })
}

