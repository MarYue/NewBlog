/* eslint-disable no-useless-escape */

const ua = navigator.userAgent
const bsEnv = {
  // 判断是否IE<11浏览器
  isIE: ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1,
  // 判断是否IE的Edge浏览器
  isEdge: ua.indexOf('Edge') > -1 && !(ua.indexOf('compatible') > -1 && ua.indexOf('MSIE') > -1),
  // 判断是否是IE11浏览器
  isIE11: ua.indexOf('Trident') > -1 && ua.indexOf('rv:11.0') > -1
}

// 获取文件
const getFiles = (requireModule, suffix) => {
  const files = {}
  requireModule.keys().forEach(fileName => {
    const moduleName = fileName.replace(new RegExp((`\\.\/|\\.(${suffix})`), 'g'), '')
    files[moduleName] = requireModule(fileName)
  })
  return files
}

const getImgs = requireModule => getFiles(requireModule, 'png|jpg|gif')

// 移动端环境
const mobileEnv = {
  ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
  adr: !!ua.match(/(Android)|(Adr)/i),
  // 微信
  wx: !!ua.match(/micromessenger/i),
  // safari浏览器
  safari: !!ua.match(/Safari/i)
}

export default {
  getFiles, getImgs, bsEnv, mobileEnv
}
