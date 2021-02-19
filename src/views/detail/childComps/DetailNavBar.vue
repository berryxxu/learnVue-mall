<template>
  <div>
    <nav-bar>
      <div slot="left" class="back-btn">
        <img src="~assets/img/common/back.svg" />
      </div>
      <div slot="center" class="title">
        <div
          class="title-item"
          v-for="(title, index) in titles"
          @click="itemClick(index)"
          :class="{ isactive: index == currentIndex }"
          :key="title"
        >
          {{ title }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
 
<script>
import NavBar from "components/common/navbar/NavBar"

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
    }
  }
}
</script>
 
<style scoped>
.title {
  display: flex;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.isactive {
  color: var(--color-high-text);
}

.back-btn img {
  margin-top: 12px;
}
</style>