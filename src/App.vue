<template>
  <div id="app">
    <main-navbar></main-navbar>

    <keep-alive>
      <router-view v-if="isShow"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainNavbar from "components/content/mianNavbar/MainNavbar";
export default {
  name: "App",
  components: { MainNavbar },
  data() {
    return {
      // 控制router-view的隐藏与展示
      isShow: true
    };
  },
  // 提供可注入子组件属性
  provide() {
    return {
      reload: this.reload
    };
  },

  // 定义reload方法
  methods: {
    reload() {
      // 先隐藏
      this.isShow = false;

      // $nextTick() 将回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        this.isShow = true;
      });
    }
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
