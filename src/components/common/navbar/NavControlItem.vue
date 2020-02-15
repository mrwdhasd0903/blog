<template>
  <router-link id="nav-control-item" tag="div" :to="url">
    <slot name="text"></slot>
  </router-link>
</template>

<script>
export default {
  name: "NavControlItem",
  components: {},
  props: {
    //跳转的路由
    url: ""
  },
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
#nav-control-item {
  margin-right:0px;
  padding: 0 7px;
  transition: 0.2s ease;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-size: 20px;
  width: 44px;
  text-align: center
}
#nav-control-item:hover {
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2) inset;
}
</style>