import Vue from 'vue'
import Vuex from 'vuex'
//安装插件
Vue.use(Vuex)
//创建对象
const store = new Vuex.Store({
  state: { //变量
    counter: 1000,
    students: [{
        id: 101,
        name: 'wdh',
        age: 18
      },
      {
        id: 102,
        name: 'qwe',
        age: 14
      },
      {
        id: 103,
        name: 'saf',
        age: 16
      },
      {
        id: 104,
        name: 'zvc',
        age: 12
      }
    ],
    info: {
      name: '王达浩'
    },
    ainfo: {
      name: 'ainfo王达浩'
    }
  },
  mutations: { //方法
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    incrementCount(state, count) {
      state.counter += count
    },
    //特殊的提交方法commit({})对应的方法
    // incrementCount(state, payload) {
    //   state.counter += payload.count
    // }
    //监听修改对象未定义的key
    update(state) {
      // 不可监听state.info['address'] = '汕尾'
      // 添加使用:
      Vue.set(state.info, 'address', '汕尾')
      // 删除使用:
      Vue.delete(state.info, 'name')
    },
    //在actions里面调异步调用的测试方法
    updateInfo(state) {
      state.ainfo.name = '已异步改变'
    }
  },
  actions: { //异步方法
    //异步调用mutations的updateInfo()
    aUpdateInfo(context) {
      setTimeout(() => {
        context.commit('updateInfo')
      }, 1000);
    }
  },
  getters: { //计算属性
    powerCounter(state) {
      return state.counter * state.counter
    },
    more17stu(state) {
      return state.students.filter(s => s.age > 17)
    },
    //箭头函数写法
    moreAgeStu: state => age => state.students.filter(s => s.age > age)
  },
  modules: {
    //这里用于嵌套,即state里面还有Store
  }
})
//导出
export default store
