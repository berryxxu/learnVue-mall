<template>
  <div class="detail-param" v-if="Object.keys(paramInfo).length !== 0">
    <table class="rule-table">
      <tr v-for="(rule, index) in paramInfo.sizes[0]" :key="index">
        <td v-for="(item, index) in rule" :key="index">{{ item }}</td>
      </tr>
    </table>

    <table class="param-table">
      <tr v-for="info in paramInfo.infos" :key="info.key">
        <td class="param-key">{{ info.key }}</td>
        <td class="param-value">{{ info.value }}</td>
      </tr>
    </table>
    <div class="param-img" v-if="paramInfo.image.length != 0">
      <img v-lazy="paramInfo.image" alt="" />
    </div>
  </div>
</template>
 
<script>
export default {
  name: "DetailParamInfo",
  data() {
    return {
    }
  },
  props: {
    paramInfo: {}
  },
  methods: {},

  created() {
  }
}
</script>
 
<style scoped>
.detail-param {
  padding: 20px 15px 20px 20px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}

.detail-param table {
  width: 100%;
  border-collapse: collapse;
}

.detail-param table tr {
  height: 42px;
}

.detail-param table tr td {
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.detail-param .param-key {
  /* 保证key的宽度，防止因value过长挤压到key */
  width: 100px;
}

.detail-param .param-value {
  color: #eb4868;
}

.param-img img {
  width: 100%;
}
</style>