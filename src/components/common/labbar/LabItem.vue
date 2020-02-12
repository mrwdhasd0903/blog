<template>
  <span @click="labItemClick" :style="{background: this.labMessage.c}">{{labMessage.n}}</span>
</template>

<script>
export default {
  name: "LabItem",
  components: {},
  props: {
    labMessage: {
      c: "",
      n: "",
      i: ""
    }
  },
  computed: {},
  methods: {
    labItemClick() {
      this.$emit("labItemClick", this.labMessage.i, this.labMessage.c);
    }
  }
};
</script>

<style scoped>
span {
  cursor: pointer;
  background: rgb(119, 119, 119);
  color: #fff;
  font-size: 75%;
  font-weight: 700;
  line-height: 14px;
  padding: 4px;
  margin: 5px;
  border-radius: 3px;
}
</style>