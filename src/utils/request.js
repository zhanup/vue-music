import axios from 'axios'

const request = axios.create({
  // baseURL: process.env.VUE_APP_URL,
  baseURL: 'http://1.15.112.209:3000',
  timeout: 50000
})

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
