import _ from 'lodash'
import React from 'react'
import { isImmutable } from 'immutable'
import { Select, notification, Button, Icon } from 'antd'
import Mousetrap from 'mousetrap'
import { init } from '@sentry/browser'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const { NODE_ENV } = publicRuntimeConfig

const { Option } = Select



export function randomState(digits) {
  return Math.random()
    .toString(36)
    .substring(digits)
}


export function mapToOptions(map) {
  return _.map(map, (text, value) => (
    <Option value={value} key={value}>
      {text}
    </Option>
  ))
}

export function byteToGB(bytes) {
  return ((bytes || 0) / 1073741824).toFixed(3)
}

export function ensurePresentInState(submodule, path) {
  return new Promise(resolve => {
    ;(function waitUntilPresentInState() {
      const value = STATE()[submodule].getIn(path)
      if (isImmutable(value) ? value.isEmpty() : _.isEmpty(value)) {
        setTimeout(waitUntilPresentInState, 250)
      } else {
        resolve()
      }
    })()
  })
}

export function notifyStellarClient(action, extra) {
  const m = { action }

  if (extra) {
    m.extra = extra
  }
  try {
    window.webkit.messageHandlers.ralletsClient.postMessage(m)
  } catch (error) {
    console.error(error)
  }
  try {
    window.external.notifyStellarClient(JSON.stringify(m))
  } catch (error) {
    console.error(error)
  }
}

export function setLanguage(l) {
  localStorage.setItem('LANGUAGE', l)
  window.location.reload()
}

export function bindShortcuts() {
  Mousetrap.bind('esc l', () => {
    localStorage.setItem('resolveByLocal', true)
    window.location.reload()
  })
  Mousetrap.bind('esc r', () => {
    localStorage.setItem('resolveByLocal', false)
    window.location.reload()
  })
}

export function initSentry() {
  if (NODE_ENV === 'production') {
    init({
      dsn: 'https://cde83efdf1bf40618beab9de56176221@sentry.quanzhan.io/11'
    })
  }
}

export function notificationOpen(key, m, description, onOk, icon, onClose, d = 20) {
  notification.open({
    duration: d,
    placement: 'bottomRight',
    key,
    message: m,
    description,
    btn: onOk ? (
      <Button type="primary" onClick={onOk}>
        OK
      </Button>
    ) : null,
    icon,
    onClose
  })
}

export function progressColor() {
  return 'linear-gradient(270deg,rgba(0,127,156,1) 0%,rgba(1,203,154,1) 100%)'
}

export function iconButton(icon, onclick) {
  return <Icon type={icon} style={{ fontSize: '1.5em', cursor: 'pointer' }} onClick={onclick} />
}

export function dispatchEvent(eventName) {
  if (_.isFunction(window.Event)) {
    window.dispatchEvent(new window.Event(eventName))
  } else {
    const customEvent = document.createEvent('HTMLEvents')
    customEvent.initEvent(eventName, true, true)
    document.dispatchEvent(customEvent)
  }
}

export function isMobile() {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
}

export function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

export function isIPhone() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isIE() {
  return /Edge|MSIE|trident/i.test(navigator.userAgent)
}

export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent.toLowerCase())
}

export function logStack() {
  const { stack } = new Error()
  console.warn('PRINTING CALL STACK')
  console.warn(stack)
}
