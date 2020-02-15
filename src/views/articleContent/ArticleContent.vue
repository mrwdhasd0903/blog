<template>
  <div class>
    <h1>文章内容{{aId}}</h1>
  </div>
</template>

<script>
export default {
  name: "ArticleContent",
  components: {},
  data() {
    return {
      id: null
    };
  },
  computed: {
    aId() {
      return this.$route.params.aid;
    }
  },
  methods: {}
};
</script>

<style scoped>
</style>