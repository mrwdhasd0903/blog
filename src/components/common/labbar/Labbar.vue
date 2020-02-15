<template>
  <div class>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="card-head">
          <span>点击下方标签可筛选</span>
          <span>
            <el-button size="small" @click="pickAll" type="primary">全选标签</el-button>
            <el-button size="small" @click="cancelAll" type="success">取消全选</el-button>
          </span>
        </div>
        <slot name="lab-arr"></slot>
      </div>
      <div class="bottom" @click="cardUp">
        <span class="el-icon-caret-top">收起</span>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Labbar",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {
    cardUp() {
      this.$emit("cardUp");
    },
    pickAll() {
      this.$emit("pickAll");
    },
    cancelAll() {
      this.$emit("cancelAll");
    }
  }
};
</script>

<style scoped>
.card-head {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.clearfix {
  min-height: 400px;
}
.bottom {
  text-align: center;
  cursor: pointer;
}
</style>