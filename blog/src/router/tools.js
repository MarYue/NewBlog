// 格式化路由数组
export const fmtRoutesList = list => list.map(opt => {
  const { path, folderPath, children } = opt
  return {
    path,
    component: () => import(`@/views${folderPath || `${path}/index`}`),
    meta: {
      ...opt,
      children: undefined
    },
    children: children ? fmtRoutesList(children) : undefined
  }
})
