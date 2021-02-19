<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
.tab-bar {
  /* 子组件flex布局 */
  display: flex;
  /* 贴靠下部 */
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  text-align: center;

  /* 移动应用下导航栏高度一般设49px */
  height: 49px;
  border-top: 1px solid #eee;
  /* 背景颜色 */
  background-color: #f6f6f6;

  /* 设置阴影 */
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);

  z-index: 10;
}
</style>