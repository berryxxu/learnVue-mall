<template>
  <div class="check-button">
    <img
      src="~assets/img/cart/tick.svg"
      alt=""
      :class="{ checked: isChecked }"
    />
  </div>
</template>
 
<script>
export default {
  name: "CartCheckButton",
  data() {
    return {
    }
  },
  props: {
    isChecked: Boolean
  },
  methods: {},

  created() {
  }
}
</script>
 
<style scoped>
.check-button {
  width: 20px;
  height: 100%;
  padding: 0 2px;
  /* 选择框居中 */
  display: flex;
  align-items: center;
}

.check-button img {
  /* position: relative; */
  width: 15px;
  height: 15px;
  border-radius: 50%;

  border: 1px solid rgba(128, 128, 128, 0.4);
}

.check-button img.checked {
  background-color: var(--color-tint);
}
</style>