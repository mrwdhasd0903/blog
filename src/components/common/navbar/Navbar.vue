<template>
  <!-- 导航栏组件 -->
  <div class="nav-bar">
    <!-- 头像 -->
    <div class="heade-img">
      <slot name="heade-img"></slot>
    </div>
    <!-- 名称logo -->
    <div class="heade-name">
      <slot name="heade-name"></slot>
    </div>
    <!-- 导航按钮 -->
    <div id="nav-control">
      <slot name="nav-control"></slot>
    </div>
    <!-- 搜索框 -->
    <div id="nav-search">
      <slot name="nav-search"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.nav-bar {
  display: -webkit-flex;
  line-height: 44px;
  height: 44px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  display: flex;
  justify-content: space-between;
}
.heade-img {
  margin-left: 40px;
}
.heade-name {
  margin-left: 20px;
  margin-right: 20px;
}
#nav-control > div {
  display: flex;
  justify-content:flex-start;
}
.heade-name {
  align-self: flex-start;
}
#nav-search {
  margin-right: 44px;
}
#nav-control {
  flex-grow: 1;
}
@media screen and (max-width: 767px) {
  .heade-img {
    margin-left: 0px;
    display: none;
  }
  .heade-name {
    margin-left: 5px;
    margin-right: 5px;
  }
  #nav-control {
    display: none;
  }
}
</style>