<template>
  <!-- 轮播 -->
  <swiper>
    <!-- 轮播item -->
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a  href="https://www.aliyun.com/minisite/goods?userCode=c6po0lwh">
        <img :src="item" alt @load="imgaeLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "MainSwiper",
  props: {},
  data() {
    return {
      isLoad: false,
      banners: [
        "https://img.alicdn.com/tfs/TB1Gc3zmAL0gK0jSZFxXXXWHVXa-259-194.jpg",
        "https://img.alicdn.com/tfs/TB1hblJl7Y2gK0jSZFgXXc5OFXa-750-400.jpg",
        "https://img.alicdn.com/tfs/TB1Ak92euH2gK0jSZFEXXcqMpXa-440-255.png",
        "https://img.alicdn.com/tfs/TB1kJDyvSzqK1RjSZPxXXc4tVXa-504-320.jpg"
      ]
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
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
}
</style>