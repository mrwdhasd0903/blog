// 文章查询
import {
  request
} from './request'
export function articleSearch(searchLab, searchVal) {
  return request({
    url: '/article/search',
    // method: 'post',
    params: {
      searchLab: searchLab,
      searchVal: searchVal
    }
    // data: {
    //   Obj
    // }
  })
}
