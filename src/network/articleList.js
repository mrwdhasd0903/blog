// 分页查询
import {
  request
} from './request'
// pracurrentPage 当前页
//pageSize 页大小
export function pageQuery(currentPage, pageSize) {
  return request({
    url: '/article/pageQuery',
    params: {
      currentPage: currentPage,
      pageSize: pageSize
    }
  })
}
//留言查询
export function leaveShow() {
  return request({
    url: 'article/leaveShow'
  })
}

//留言提交
export function leaveUp(leaveName, leaveContent) {
  return request({
    url: 'article/leaveInfo',
    params: {
      leaveName: leaveName,
      leaveContent: leaveContent
    }
  })
}
