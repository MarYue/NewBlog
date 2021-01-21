const tools = {}

// 读取所有js文件
const requireModule = require.context('.', false, /^((?!index).)+\.js$/)
requireModule.keys().forEach(fileName => {
  Object.assign(tools, requireModule(fileName).default)
})

export default tools
