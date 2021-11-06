/* eslint-disable no-undef */
// 调节<html>字体大小(即1rem的大小)
(function (doc, win) {
  // 像素
  window.dpr = window.devicePixelRatio === 3 ? 3 : 2
  // 设备信息
  const u = navigator.userAgent
  // 是否安卓
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
  const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  const isWx = !!u.match(/micromessenger/i)
  // 是否pc
  const isPc = !isAndroid && !isIos
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
  bodyDom.className += isAndroid ? ' adr' : isIos ? (scrH === 812 && scrW === 375) || (scrH === 896 && scrW === 414) ? ' ipx' : ' ios' : isPc ? 'pc' : ''

  // 主题颜色
  const color = u.replace(/(.*)color=(.{1})(.*)/i, '$2')
  bodyDom.className += color === 'w' || color === 'd' ? ' white' : color === 'b' ? ' black' : ''
  // 键盘弹起删除提醒
  window.androidKeyShowCallback = _ => {
    $('.van-toast.is-placemiddle').hide()
  }
  // // 主包切换皮肤
  // window.onSkinChange = ({ color }) => {
  //   const cls = bodyDom.className.replace(/black|white/gi, '')
  //   bodyDom.className = `${cls}${color === 'w' || color === 'd' ? ' white' : color === 'b' ? ' black' : ''}`
  // }
  // // PC客户端皮肤切换 2-白色，1-黑色
  // win.ChangeSkinColor = e => {
  //   const nTheme = Number(e) === 1 ? 'black' : Number(e) === 2 ? 'white' : ''
  //   bodyDom.className = bodyDom.className.replace(/white|black/g, '') + ' ' + nTheme
  // }
  // // 首次打开获取
  // typeof win.GetSkinColor === 'function' && win.ChangeSkinColor(win.GetSkinColor())

  // 安卓微信禁止字体放大
  if (isWx && isAndroid) {
    let timer = null
    let loadFlg = false
    const forbidFontSizeScale = _ => {
      // 微信对象
      const WeixinJSBridge = window.WeixinJSBridge
      if (!WeixinJSBridge) return
      // 清除定时器
      timer && clearInterval(timer)
      // 返回
      if (loadFlg) return
      const setFontSize = _ => {
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 })
      }
      const handleFontSize = () => {
        // 设置网页字体为默认大小
        setFontSize()
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', setFontSize)
      }
      if (typeof WeixinJSBridge === 'object' && typeof WeixinJSBridge.invoke === 'function') {
        handleFontSize()
      } else {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', handleFontSize, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', handleFontSize)
          document.attachEvent('onWeixinJSBridgeReady', handleFontSize)
        }
      }
      loadFlg = true
    }
    forbidFontSizeScale()
    // 循环获取WeixinJSBridge
    timer = setInterval(forbidFontSizeScale, 200)
  }
})(document, window)
