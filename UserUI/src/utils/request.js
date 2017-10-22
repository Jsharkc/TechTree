import axios       from 'axios'
import qs          from 'qs'
import HttpStatus  from 'http-status-codes'
import { baseURL } from './config'

axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 15000;
axios.defaults.withCredentials = true;

const fetch = (options) => {
  let {
    method = 'get',
    headers,
    data,
    url,
  } = options

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${data ? `?${qs.stringify(data)}` : ''}`)
    case 'delete':
      return axios.delete(url, { data })
    case 'head':
      return axios.head(url, data)
    case 'post':
      return axios.post(url, data)
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

export default function request (options) {
  return fetch(options).then((response) => {
    console.info('options: ', options, 'response: ', response);
    if (response.status === HttpStatus.OK) {
      return response.data
    }
    throw { response }
  }).catch((error) => {
    const { response } = error;
    console.error('request error: ', error);
    let message
    let status
    if (response) {
      status = response.status
      const { data, statusText } = response
      message = data.message || statusText || HttpStatus.getStatusText(status)
    } else {
      status = 600
      message = 'Network Error'
    }
    throw { status, message }
  })
}

export const setToken = function (authToken) {
  axios.defaults.headers.common.Authorization = `Bearer ${authToken}`
}
