import fetch from 'isomorphic-unfetch'
import queryString from 'query-string'

const API_ROOT =  'http://localhost:8000';

function headers() {
  return {
    Accept: 'application/json',
    "Content-Type": 'application/x-www-form-urlencoded',
  }
}

function body(data) {
  return {
    //ORIGIN: global.location.origin,
    //DEVICE_TYPE,
    ...data
  }
}

async function Request (method, path, data = {}, root = null){
  const params = body(data)
  const query = queryString.stringify(params)
  console.info(`${root || API_ROOT}/${path}?${query}`)
  const res = await fetch(`${root || API_ROOT}/${path}?${query}`, {
    method: method,
    headers: headers(),
    //body: JSON.stringify(body(data))
  })
  const json = await res.json()
  return json
}

export default Request
