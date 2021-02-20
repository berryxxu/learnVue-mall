<template>
</template>
 
<script>
export default {
  name: "DetailRecommend",
  components: {
    GoodList
  },
  props: {
    recomenndList: {
      type: Array,
      default() { return [] }
    }
  },
  data() {
    return {
    }
  },

  methods: {},

  created() {
  }
}
</script>
 
<style scoped>
</style>