<template>
  <!-- 轮播 -->
  <div v-if="carousel.switch" class="block">
    <el-carousel height="200px">
      <el-carousel-item v-for="(item,index) in carousel.items" :key="index">
        <a target="_blank" :href="item.href">
          <img :src="item.src" alt />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "MainSwiper",
  props: {},
  data() {
    return {
      isLoad: false,
      carousel: {
        switch: true,
        items: [
          {
            src:
              "https://img.alicdn.com/tfs/TB1Gc3zmAL0gK0jSZFxXXXWHVXa-259-194.jpg",
            href: "https://www.aliyun.com/minisite/goods?userCode=c6po0lwh"
          },
          {
            src:
              "https://img.alicdn.com/tfs/TB1hblJl7Y2gK0jSZFgXXc5OFXa-750-400.jpg",
            href: "https://www.aliyun.com/minisite/goods?userCode=c6po0lwh"
          },
          {
            src:
              "https://img.alicdn.com/tfs/TB1Ak92euH2gK0jSZFEXXcqMpXa-440-255.png",
            href: "https://www.aliyun.com/minisite/goods?userCode=c6po0lwh"
          },
          {
            src:
              "https://img.alicdn.com/tfs/TB1kJDyvSzqK1RjSZPxXXc4tVXa-504-320.jpg",
            href: "https://www.aliyun.com/minisite/goods?userCode=c6po0lwh"
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    imgaeLoad() {
      if (!this.isLoad) {
        this.$emit("swiperImageload");
        this.isLoad = true;
      }
    }
  }
};
</script>
<style scoped>
img {
  width: 100%;
  height: 100%;
  border-radius: 2px;
}
.block {
  border-radius: 2px;
  overflow: hidden;
  width: 100%;
}
</style>
<style>
.block .el-carousel__button {
  width: 8px;
}
</style>