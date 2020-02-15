<template>
  <div class="articleItem">
    <h3>{{articleItem.title}}</h3>
    <span
      class="tag"
      v-for="(item,index) in labelArray"
      :key="index"
      :style="{background: item.c}"
    >{{item.n}}</span>
    <p class="msg">
      <span class="el-icon-mouse">访问{{articleItem.readCount}}次</span>
      <span class="el-icon-edit">发表于{{articleItem.publishedTime.substr(0, 10)}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: "ConbarItem",
  props: {
    articleItem: {
      id: null,
      labelArray: ``,
      publishedTime: "",
      rank: null,
      readCount: null,
      title: ""
    }
  },
  data() {
    return {
      // 存放序列化标签
      labelArray: []
    };
  },
  watch: {
    // 监听标签改变
    articleItem(n, o) {
      this.labelArray = JSON.parse(n.labelArray);
    }
  },
  computed: {},
  // 初始化标签
  created() {
    this.labelArray = JSON.parse(this.articleItem.labelArray);
  },
  components: {},
  methods: {}
};
</script>

<style scoped>
.articleItem {
  padding: 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  transition: 0.2s ease;
  color: #000000
}
.articleItem:hover {
  transform: translateX(-10px);
  /* width: calc(100% + 10px); */
}
.msg {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5)
}
.tag {
  cursor: pointer;
  background: rgb(119, 119, 119);
  color: #fff;
  font-size: 75%;
  font-weight: 700;
  line-height: 35px;
  padding: 4px;
  margin: 5px;
  border-radius: 3px;
}
@media screen and (max-width: 749px) {
  .articleItem:hover {
    transform: translateX(0);
    /* width: 100%; */
  }
}
</style>