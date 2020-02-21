// import Vue from 'vue'
// import VueRouter from 'vue-router'

const ArticleList = () => import("views/articleList/ArticleList")
const ArticleContent = () => import("views/articleContent/ArticleContent")
const ArticleSearch = () => import("views/articleSearch/ArticleSearch")


// 1 安装插件
// Vue.use(VueRouter)

// 2配置路径和组件的映射信息
const routes = [{
    path: '/',
    redirect: '/articleList'
  }, {
    path: '/articleList',
    component: ArticleList,
  }, {

    path: '/articleList/:aid',
    component: ArticleContent,
  }, {

    path: '/articleSearch',
    component: ArticleSearch,
  }


]
// 2 创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
