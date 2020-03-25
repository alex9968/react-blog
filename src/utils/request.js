import fetch from 'isomorphic-unfetch'
import queryString from 'query-string'
const dns = {
  API_ROOT: 'http://localhost:8000',
}

const R = {
  headers() {
    return {
      Accept: 'application/json',
      "Content-Type": 'application/x-www-form-urlencoded',
    }
  },

  async testApiRoot(rootUrl) {
    const response = await fetch(`${rootUrl}/ping`)
    const { ok, status } = response
    if (ok && status === 200) {
      return response.text().then(text => {
        if (text === 'pong') {
          return rootUrl
        }
        return Promise.reject()
      })
    }
    return Promise.reject(new Error(`ok: ${ok}, status: ${status}`))
  },

  delete(path, data) {
    return fetch(`${dns.API_ROOT}/${path}`, {
      method: 'DELETE',
      body: JSON.stringify(R.body(data)),
      headers: R.headers()
    })
  },

  body(data) {
    return {
      //ORIGIN: global.location.origin,
      //DEVICE_TYPE,
      // locale: global.LANGUAGE,
      ...data
    }
  },

  async get(path, data = {}, root = null) {
    //R.getAuthorization()
    const params = R.body(data)
    const query = queryString.stringify(params)
    console.info(`${root || dns.API_ROOT}/${path}?${query}`)
    const res = await fetch(`${root || dns.API_ROOT}/${path}?${query}`, {
      method: 'GET',
      //mode: 'no-cors',
      headers: R.headers()
    })
    const json = await res.json()
    return json
  },

  async patch(path, data) {
    R.getAuthorization()
    const res = await fetch(`${dns.API_ROOT}/${path}`, {
      method: 'PATCH',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })
    const content = await R.parseResponse(res)
    return content
  },

  async post(path, data) {
    R.getAuthorization()
    const res = await fetch(`${dns.API_ROOT}/${path}`, {
      method: 'POST',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })
    const content = await R.parseResponse(res)
    console.info(content )
    return content //返回一个Promise 给login界面
  },

  async put(path, data) {
    R.getAuthorization()
    const res = await fetch(`${dns.API_ROOT}/${path}`, {
      method: 'PUT',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })

    const content = await R.parseResponse(res)
    return content
  }
}

export default R
