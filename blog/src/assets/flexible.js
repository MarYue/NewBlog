/* eslint-disable no-mixed-operators */
/* eslint-disable no-undef */
// 调节<html>字体大小(即1rem的大小)
;(function (doc, win) {
  // 像素
  window.dpr = window.devicePixelRatio === 3 ? 3 : 2
  // 设备信息
  const u = navigator.userAgent
  // 是否安卓
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  const isWx = !!u.match(/micromessenger/i)
  // 文档对象
  const docEl = doc.documentElement
  const resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize'
  // body对象
  const bodyDom = doc.getElementsByTagName('body')[0]
  // 重置函数
  const recalc = () => {
    // 获取原窗口的高度、宽度
    const originalHeight = docEl.clientHeight || doc.body.clientHeight
    // 计算字体
    const originalWidth = docEl.clientWidth || doc.body.clientWidth
    // 键盘弹起与隐藏都会引起窗口的高度发生变化
    const resizeHeight = docEl.clientHeight || doc.body.clientHeight
    // resizeHeight<originalHeight证明窗口被挤压了
    if (isAndroid && resizeHeight - 0 < originalHeight - 0) {
      window.androidKeyShowCallback && window.androidKeyShowCallback()
    }

    if (!originalWidth) return
    window.docFz = originalWidth / 375
    const clientWidth = originalWidth > 1024 ? 1024 : originalWidth
    docEl.style.fontSize = 50 * (clientWidth / 375) + 'px'
  }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)

  // 微信兼容
  isWx && (bodyDom.className += ' wx')
  // ipx样式及ios样式
  const { height: scrH, width: scrW } = screen
  bodyDom.className += isAndroid ? ' adr' : isIos ? scrH === 812 && scrW === 375 || scrH === 896 && scrW === 414 ? ' ipx' : ' ios' : ''

  // 主题颜色
  const color = u.replace(/(.*)color=(.{1})(.*)/i, '$2')
  bodyDom.className += color === 'w' || color === 'd' ? ' white' : color === 'b' ? ' black' : ''
  // 键盘弹起删除提醒
  window.androidKeyShowCallback = _ => {
    $('.van-toast.is-placemiddle').hide()
  }
  window.onSkinChange = ({ color }) => {
    const cls = bodyDom.className.replace(/black|white/gi, '')
    bodyDom.className = `${cls}${color === 'w' || color === 'd' ? ' white' : color === 'b' ? ' black' : ''}`
  }
})(document, window)
