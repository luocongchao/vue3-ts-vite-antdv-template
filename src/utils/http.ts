import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import { useMessage } from '@/hooks/useMessage'
const { createMessage } = useMessage()
// baseURL
// const BASE_URL = '/api'

const instance = axios.create({
  // baseURL: BASE_URL,
  withCredentials: true,
  timeout: 30000,
})

instance.interceptors.request.use(
  (config) => {
    // 请求头 token配置
    const token = ''

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + token,
      } as AxiosRequestHeaders
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (response.status >= 200 && response.status < 300) {
      if (res.code === undefined) {
        return res
      }
      // 正确状态
      if (res.code >= 200 && res.code < 300) {
        return res.data
      }
    }
    // 异常
    createMessage.error(res.message)
    return Promise.reject(res)
  },
  (error) => {
    console.log('err' + error) // for debug
    const { response } = error
    const { status } = response
    // if (error === '没有操作权限') return;
    if (status === 401) {
      // todo: 退出登录
      return
    }
    if (status === 403) {
      createMessage.warn('权限不足')
    }
    const { data } = response
    createMessage.error((data && data["message"]))
    return Promise.reject()
  },
)

const request = <T = any>(
  config: AxiosRequestConfig | string,
  options?: AxiosRequestConfig,
): Promise<T> => {
  if (typeof config === 'string') {
    if (!options) {
      return instance.request<T, T>({
        url: config,
      })
      // throw new Error('请配置正确的请求参数');
    } else {
      return instance.request<T, T>({
        url: config,
        ...options,
      })
    }
  } else {
    return instance.request<T, T>(config)
  }
}

export function get<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'get' }, options)
}

export function post<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'POST' }, options)
}

export function put<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'PUT' }, options)
}

export function del<T = any>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> {
  return request({ ...config, method: 'DELETE' }, options)
}

export default { request }