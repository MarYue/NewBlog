const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/crypto')

// 登录
const login = async(username, password) => {
  username = escape(username)
  // 生成加密密码
  password = genPassword(password)
  password = escape(password)

  const sql = `select username, realname, avatar, likes, goods from users where username=${username} and password=${password}`

  const rows = await exec(sql)
  return rows[0] || {}
}

// 注册
const register = async(username, password, realname, email) => {
  username = escape(username)
  password = genPassword(password)

  // 注册时检验是否有相同账号
  let test = `select username from users where username=${username}`
  const testData = await exec(test)
  if(testData.length > 0) {
    return {
      num: testData.length,
      id: 0
    }
  }
  const sql = `insert into users(username, realname, password, email, likes, goods) values ${username}, ${realname}, ${password}, ${email}, '', '')`
  const insertData = await exec(sql)
  return {
    num: 0,
    id: insertData.insertId
  }
}

const updateAvatar = async(username, avatar_url) => {
  const sql = `update users set avatar='${avatar_url}' where username='${username}'`
  const insertData = await exec(sql)
  return insertData
}

