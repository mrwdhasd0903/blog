import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import hljs from 'highlight.js'
import 'highlight.js/styles/an-old-hope.css' //样式文件

// import less from 'less'
// Vue.use(less)
Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(hljs)

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
