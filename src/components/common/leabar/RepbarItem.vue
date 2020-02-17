<template>
  <div class="leave-item">
    <p>
      <span class="leave-name">{{replyItem.replyName}}：</span>
      <span>{{replyItem.replyContent}}</span>
    </p>
    <p v-if="replyItem.quoteReply">
      <span class="leave-name">
        <span class="el-icon-caret-right"></span>博主回复：
      </span>
      <span>{{replyItem.quoteReply}}</span>
    </p>
    <p class="published-time">{{replyItem.publishedTime}}</p>
  </div>
</template>

<script>
export default {
  name: "RepbarItem",
  props: {
    replyItem: {
      replyContent: "支持一下https",
      replyId: 62,
      replyName: "pypyn",
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
.el-icon-caret-right {
  color: rgba(0, 0, 0, 0.3);
}
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