<template>
  <div>
    <nav-bar class="home-nav">
      <div slot="center">商城首页</div>
    </nav-bar>
    首页
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
export default {
  components: {
    NavBar
  }}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color:white;
}
</style>