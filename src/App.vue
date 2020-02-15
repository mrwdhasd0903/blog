<template>
  <div id="app">
    <main-navbar></main-navbar>

    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import MainNavbar from "components/content/mianNavbar/MainNavbar";
export default {
  name: "App",
  components: { MainNavbar }
};
</script>

<style>
@import "assets/css/base.css";
</style>
