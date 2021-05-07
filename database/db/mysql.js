// 用于统一执行 sql 语句
const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const connection = mysql.createConnection(MYSQL_CONF)

// 开始连接
connection.connect()

// 统一执行 sql 的函数
function exec(sql) {
  const promise = new Promise((resolve, reject) => {
    connection.query(sql, (err, result) => {
      if(err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}