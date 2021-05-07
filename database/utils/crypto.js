const crypto = require('crypto')

// 密钥
const PRIVATE_KEY = 'mysynforever'

// 加密
function md5(word) {
  let md5 = crypto.createHash('md5')
  return md5.update(word).digest('hex')
}

function genPassword(password) {
  const str = `password=${password}&key=${PRIVATE_KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}