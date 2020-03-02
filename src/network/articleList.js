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

//留言push查询
export function leavePush(currentLeave, leaveSize) {
  return request({
    url: 'article/leavePush',
    params: {
      currentLeave: currentLeave,
      leaveSize: leaveSize
    }
  })
}

//留言提交
export function leaveUp(leaveName, leaveContent) {
  return request({
    url: 'article/leaveInfo',
    params: {
      leaveName: leaveName.substring(0, 12),
      leaveContent: leaveContent
    }
  })
}
