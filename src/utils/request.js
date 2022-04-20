import axios from 'axios'

const request = axios.create({
  baseURL: process.env.VUE_APP_URL,
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
