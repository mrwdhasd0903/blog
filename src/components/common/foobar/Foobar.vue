<template>
  <div class="footer">
    <p>©2020-www.wdhhh.cn | By 小王的程序人生</p>
    <p>
      <span slot="reference" @click="callMe">联系博主</span>
      <span> | </span>
      <a href="http://www.beian.gov.cn">粤ICP备20003149号</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Footbar",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    callMe() {
      this.$notify({
        title: "WeChat/QQ",
        message: "13267702472 / 2553378438",
        duration: 0
      });
    }
  }
};
</script>

<style scoped>
p,
a {
  text-align: center;
  color: #000;
  line-height: 30px
}
span {
  cursor: pointer;
}
.footer {
  padding-top:  20px;
}
</style>