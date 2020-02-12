// home 的网络请求
import {
  request
} from './request'

export function getTheme() {
  return request({
    url: '/theme/getTheme'
  })
}

export function getAllLabel() {
  return request({
    url: '/article/getAllLabel'
  })
}
