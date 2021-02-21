<template>
  <div class="base-info" v-if="Object.keys(baseInfo).length != 0">
    <div class="info-title">{{ baseInfo.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ baseInfo.newPrice }}</span>
      <span class="o-price">{{ baseInfo.oldPrice }}</span>
      <span class="discount">{{ baseInfo.discount }}</span>
    </div>

    <div class="info-other">
      <span>{{ baseInfo.columns[0] }}</span>
      <span>{{ baseInfo.columns[1] }}</span>
      <span>{{ baseInfo.services[baseInfo.services.length - 1].name }}</span>
    </div>

    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in baseInfo.services.length - 1"
        :key="index"
        ><img v-lazy="baseInfo.services[index - 1].icon" />
        <span>{{ baseInfo.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "DetailBaseInfo",
  data() {
    return {
    }
  },
  props: {
    baseInfo: {
      type: Object,
      default: {}
    }
  },

  methods: {},

  created() {
  }
}
</script>
 
<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 10px;
  color: #999;
  border-bottom: 3px solid #f2f5f8;
}

.info-title {
  color: #222;
}

.info-price {
  margin-top: 10px;
}

.info-price .n-price {
  color: var(--color-high-text);
  font-size: 25px;
}

.info-price .o-price {
  font-size: 14px;
  margin-left: 5px;
  text-decoration: line-through;
}

.info-price .discount {
  background-color: var(--color-high-text);
  color: white;
  font-size: 14px;
  margin-left: 5px;

  /* 设置圆角 */
  padding: 2px 5px;
  border-radius: 8px;

  /* 元素上浮 */
  position: relative;
  top: -8px;
}

.info-other {
  margin-top: 15px;
  line-height: 30px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-service {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  /* margin: 10px 0; */
  line-height: 60px;
}

.info-service img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 2px;
}
</style>