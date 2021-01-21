/* eslint-disable no-useless-escape */
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

export default {
  getFiles, getImgs
}
