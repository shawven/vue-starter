import axios from 'axios'
import Qs from 'qs'

// 创建一个axios实例
const service = axios.create({

  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,

  // 正确状态码的范围
  validateStatus: (status) => {
    return status >= 200 && status < 300
  },

  // 请求超时
  timeout: 5000,

  // 请求参数序列号
  paramsSerializer: function(params) {
    return Qs.stringify(params)
  },

  // 携带cookie
  withCredentials: true
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (config.data) {
      config.data = getRequestData(config.data)
    }
    if (config.params) {
      config.params = getRequestParams(config.params)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

const refresh = () => {
  service.post('http://localhost:8090/oauth/token', {
    grant_type: 'refresh_token',
    refresh_token: this.data.refresh_token,
    client_id: 'app'
  }).then(result => {
    this.tokenData = result.data
  })
}

// 响应拦截器
service.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    console.log(error)
    if (error.response.data.code) {
      return refresh()
    }

    // 超时
    if (error.message.startsWith('timeout')) {
      const matchArray = new RegExp('.*\\s{1}(\\d+)ms.*').exec(error.message)
      error = new Error('连接已超时超过' + matchArray[1] / 1000 + '秒')
    // 会话超时
    } else if (error.response.status === 401) {
      const message = getErrorMessage(error)
      if (message === 'Require login') {
        // 重新登录
        console.error(message)
      }
      error = new Error(message)
    } else {
      error = new Error(getErrorMessage(error))
    }
    return Promise.reject(error)
  }
)

const getErrorMessage = (error) => {
  if (error.response) {
    if (typeof error.response.data === 'object') {
      // 获取系统返回信息
      return error.response.data.message
    } else {
      // 状态码 + 状态描述文档 + 系统异常信息
      return error.response.status + ' ' + error.response.statusText + '<br>' + error.response.data
    }
  } else {
    // Error描述
    return error.message
  }
}

const getRequestParams = (obj) => {
  if (obj) {
    const newParams = {}
    for (const [k, v] of Object.entries(obj)) {
      if (v !== 0 && !v) {
        continue
      }
      newParams[k] = v
    }
    return newParams
  }
  return {}
}

const getRequestData = (obj) => {
  if (obj) {
    const formData = new FormData()
    for (const [k, v] of Object.entries(obj)) {
      if (v !== 0 && !v) {
        continue
      }
      formData.append(k, v)
    }
    return formData
  }
  return {}
}

export const baseUrl = service.defaults.baseURL

export default service
