<template>
  <div class="leave-item">
    <p>
      <span class="leave-name">{{leaveItem.leaveName}}：</span>
      <span>{{leaveItem.leaveContent}}</span>
    </p>
    <p class="published-time">{{leaveItem.publishedTime}}</p>
  </div>
</template>

<script>
export default {
  name: "LeabarItem",
  props: {
    leaveItem: {
      leaveContent: "支持一下https",
      leaveId: 62,
      leaveName: "pypyn",
      publishedIp: "125.123.27.182",
      publishedTime: "2020-01-23 12:28:15"
    }
  },
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
.leave-item {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 15px;
  padding: 5px 10px;
  padding-bottom: 0;
  line-height: 22px;
}
.leave-name {
  font-weight: 700;
}
.published-time {
  line-height: 35px;
  text-align: right;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
}
</style>