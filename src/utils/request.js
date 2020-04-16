import fetch from 'isomorphic-unfetch'
import queryString from 'query-string'
const dns={API_ROOT:'http://192.168.3.15:8000'}
//const dns={API_ROOT:'http://server.dreamma.vip:8000'}

const R = {
  headers() {
    return {
      //Authorization: R.getAuthorization(),
      Accept: 'application/json',
      "Content-Type": 'application/json'
    }
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
    const params = R.body(data)
    const query = queryString.stringify(params)
    console.info(`${root || dns.API_ROOT}/${path}?${query}`)
    const res = await fetch(`${root || dns.API_ROOT}/${path}?${query}`, {
      method: 'GET',
      headers: R.headers()
    })
    const json = await res.json()
    return json
  },

  async patch(path, data) {
    const res = await fetch(`${dns.API_ROOT}/${path}`, {
      method: 'PATCH',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })
    const json = await res.json()
    return json
  },

  async post(path, data= {}) {
    const params = R.body(data)
    const query = queryString.stringify(params)
    console.info(`${dns.API_ROOT}/${path}?${query}`)
    const res = await fetch(`${dns.API_ROOT}/${path}?${query}`, {
      method: 'POST',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })
    const json = await res.json()
    return json
  },

  async put(path, data) {
    const res = await fetch(`${dns.API_ROOT}/${path}`, {
      method: 'PUT',
      headers: R.headers(),
      body: JSON.stringify(R.body(data))
    })

    const json = await res.json()
    return json
  }
}

export default R
