// 存放 MySQL 和 redis 的配置
const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if(env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'mary1998.',
    port: '3306',
    database: 'myarticle'
  }
  // REDIS_CONF
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if(env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',  // 要换成正式地址
    user: 'root',
    password: 'mary1998.',
    port: '3306',
    database: 'myarticle'
  }
  // REDIS_CONF
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'  // 要换成正式地址
  }
}