import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import App from 'next/app'
import createStore from '../redux/createStore'
import withRedux from 'next-redux-wrapper'
import HeadMeta from '../components/head'
import Nav from '../components/nav'
import Foot from '../components/foot'
import loginState from '../http/sessions'
import getPublicData from '../http'
import {  myNotification } from '../http/self'
import {  bindShortcuts } from '../utils'
import request, { getApiRoot  } from '../utils/request'
import { isMobile } from '~/utils'
import '../styles/main.scss'
import 'antd/dist/antd.css'


class MyApp extends App {
  state = {
    user: 'hello',
    isMobile: false
  }


  static async getInitialProps({ Component, ctx }) {
    // ctx 报错
    if (typeof window === 'undefined') {
      global.navigator = {}
      global.navigator.languages = {}
      global.location = {}
    }
    // const { req: { headers: { cookie } } } = ctx
    // const locale = cookie.locale || 'zh'
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}
    const initialNow = Date.now()
    return { pageProps, initialNow }
  }

  componentDidMount() {
    const { props } = this
    const { store } = props
    window.STORE = store
    window.DISPATCH = store.dispatch
    bindShortcuts()
    request
      .getApiRoot()
      .then(() => {
        store.dispatch(getPublicData())
        //store.dispatch(loginState()).then(() => store.dispatch(myNotification()))
     })
      .finally(() => {
        this.setState({ initializing: false })
      })
  }

  render() {
    const { Component, pageProps, store } = this.props

    return (
      <ReduxProvider store={store}>
        <HeadMeta />
        <Nav />
        <div style={{ position: 'relative' }}>
          <Component {...pageProps} />
        </div>
        <Foot />
      </ReduxProvider>
    )
  }
}

export default withRedux(createStore)(MyApp)


