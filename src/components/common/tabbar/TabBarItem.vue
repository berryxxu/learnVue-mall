<template>
  <div class="tab-bar-item" @click="linkClicked">
    <!-- 这里在slot上设置v-if和v-else也能实现切换。但若有其他设置可能会时效 ，因而一般都用div包裹起来较好 -->
    <div v-if="isActive">
      <slot name="item-icon-active"></slot>
    </div>
    <div v-else>
      <slot name="item-icon"></slot>
    </div>
    <!-- 若直接在slot上设置style，会因为插槽被替换而失去style。因而用div将slot包裹起来设置style -->
    <div :style="textStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeTextColor: {
      type: String,
      //若父组件未设置活跃颜色，则使用这个值
      default: "deeppink"
    }
  },
  computed: {
    isActive() {
      //通过判断当前活跃路由的path是否为本项目设定的path，来判断本项目是否活跃
      return this.$route.path.indexOf(this.path) !== -1;
    },
    textStyle() {
      //方式1. 设置字符串
      // return this.isActive ? `color: ${this.activeTextColor}` : ""
      //方式2. 设置对象
      return this.isActive ? { color: this.activeTextColor } : {}
    }
  },
  methods: {
    //点击item时完成路由跳转
    linkClicked() {
      //需要返回，使用push
      // this.$router.push(this.path);
      //不需要返回，使用replace
      this.$router.replace(this.path);
    }
  }
}
</script>

<style>
.tab-bar-item {
  /* 均匀布局 */
  flex: 1;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  /* 图片下方默认有3px的空间，vertical-align设middle把它去掉，设为2px */
  vertical-align: middle;
}
</style>