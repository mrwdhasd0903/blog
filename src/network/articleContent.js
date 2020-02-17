// 文章查询
import {
  request
} from './request'
export function findOneArticle(id) {
  return request({
    url: '/article/findOneArticle',
    params: {
      id: id
    }
  })
}
//回复查询
export function replyShow(id) {
  return request({
    url: 'article/replyShow',
    params: {
      id: id
    }
  })
}

// 回复提交
export function replyUp(replyName, replyContent, aId) {
  return request({
    url: 'article/replyInfo',
    params: {
      replyName: replyName,
      replyContent: replyContent,
      aId: aId
    }
  })
}
