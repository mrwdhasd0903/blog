// import Vue from 'vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import hljs from 'highlight.js'
// import 'highlight.js/styles/an-old-hope.css' //样式文件
//自己的
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Vue.use(ElementUI);
Vue.use(hljs)

Vue.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
