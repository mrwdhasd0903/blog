<template>
  <div id="nav-control-item">
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  name: "NavControlItem",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
#nav-control-item {
  margin-right: 20px;
  padding: 0 7px;
  transition: 0.2s ease;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
#nav-control-item:hover {
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2) inset;
}
</style>