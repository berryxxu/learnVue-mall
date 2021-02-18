<template>
  <div class="nav-bar">
    <div class="left"><slot name ="left"></slot></div>
    <div class="center"><slot name ="center"></slot></div>
    <div class="right"><slot name ="right"></slot></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-bar{
  display:flex;
  /* 没有内容时无高度 */
  line-height:44px; 
  /* 内容居中 */
  text-align:center;
  box-shadow: 0 1px 1px rgba(100,100,100,0.1)
}

.left{
  width: 60px;
}

.right {
  width: 60px
}

.center {
  /* 填充所有剩余高度 */
  flex:1;
}

</style>