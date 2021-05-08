import axios from 'axios'
// import apis from '@api'
import tools from './tools'
import { Toast } from 'vant'

const { bsEnv: { isIE, isIE11 } } = tools

const qs = require('qs')

// 修改全局默认值
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'

// CancelToken 工厂函数，可以用来取消请求
// isCancle,
const { isCancel, CancelToken } = axios
// 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
const pending = []
// 移除请求队列中的请求
const removePending = ever => pending.forEach(p => {
  const { url, cancelMsg } = ever
  // 当前请求在数组中存在时执行函数体
  if (p.u === url) {
    // 执行取消操作
    p.f(cancelMsg)
    // 把这条记录从数组中移除
    pending.splice(p, 1)
  }
})

// 请求拦截器
const interceptorsRequest = config => {
  // 获取配置
  const { data, url, params: { axiosConf: { noLoading, dataFmt, cancelMsg } = {} } = {} } = config
  // 数据格式化
  dataFmt && (config.data = qs.stringify(data))
  // 加载
  !isIE && !isIE11 && !noLoading && Toast.Loading({
    mask: true,
    forbidClick: true,
    duration: 0,
    message: typeof noLoading === 'string' ? noLoading : ''
  })
  // 在下一个ajax发送前执行一下取消操作
  removePending({cancelMsg, url})
  config.cancelToken = new CancelToken(c => {
    // 这里的ajax标识是用请求地址&请求方式拼接的字符串，也可以用其他的一些方式
    pending.push({u: url, f: c})
  })
  return config
}

// 响应拦截器
const interceptorsRespons = options => response => {
  // 获取配置
  const { sucCode = 1, sucCodeKey = 'status', msgKey = 'msg' } = options
  // 获取响应及配置项
  const {
    data, data: { [sucCodeKey]: code, [msgKey]: msg },
    config: { params: {axiosConf: { cancelMsg, hideMsg, noLoading } = {}} = {}, url }
  } = response
  // 重置loading
  !noLoading && Toast.clear()
  // 在一个ajax响应后再执行一下取消操作，把已完成的请求从pending中移除
  removePending({ cancelMsg, url })
  // 正常返回
  if (typeof code === 'undefined' || code === sucCode) return data
  // 是否提示消息
  !hideMsg ? Toast(msg) : typeof hideMsg === 'function' && hideMsg(data)
  // 弹出错误
  return Promise.reject(code)
}

export default class Request {
  constructor (options) {
    const { apis } = options
    this.apis = apis
    this.service = {}
    this.options = options
    // 初始化
    this.reqInit(options)
  }
  reqInit (options) {
    // 初始化请求实例
    const service = axios.create({
      // baseURL: '',
      timeout: 20000, // 请求超时时间
      withCredentials: true,
      ...options
    })
    // request 拦截器
    service.interceptors.request.use(interceptorsRequest, error => Promise.reject(error))
    // response 拦截器
    service.interceptors.response.use(interceptorsRespons(options), error => {
      // 取消
      if (isCancel(error)) return
      // 加载
      Toast.clear(true)
      // 弹出错误
      return Promise.reject(error)
    })
    // 全局赋值
    this.service = service
  }

  // 请求
  async request (api, data, conf = {}, headers = {}) {
    let url = /^http/.test(api) ? api : this.getApi(api)
    // 如果是对象 对应url
    typeof url === 'object' && (url = url[process.env.NPDE_ENV === 'production' ? 'production' : 'development'])
    // 获取请求方式
    const [path, reqType = 'get', dataFmt] = url.split(',')
    // 合并配置
    const axiosConf = dataFmt || Object.keys(conf).length ? {dataFmt, ...conf} : false
    // 调用对应方法
    return this[reqType](path, data, axiosConf, headers, true)
  }

  async get (api, params, axiosConf, headers = {}, flg) {
    const service = await this.service({
      url: flg ? api : this.getApi(api),
      params: axiosConf ? {...params, axiosConf} : params,
      headers
    })
    return service
  }

  async post (api, data, axiosConf, headers = {}, flg) {
    const service = await this.service({
      url: flg ? api : this.getApi(api),
      method: 'post',
      data,
      params: axiosConf ? { axiosConf } : undefined,
      headers,
      ...axiosConf
    })
    return service
  }

  /*
  * 获取请求接口
  * @Params key
  * @Typeof String
  * */
  getApi (key) {
    const { apis } = this
    if (key.indexOf('_') === -1) {
      return apis[key]
    } else {
      let api = apis
      key.split('_').forEach(k => (api = api[k]))
      return api
    }
  }
}
