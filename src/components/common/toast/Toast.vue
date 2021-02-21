<template>
  <div class="toast" v-show="isShow">
    <div class="toast-msg">{{ message }}</div>
  </div>
</template>
 
<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: '',
      duration: 0
    }
  },
  methods: {
    show(message, duration = 1000) {
      this.message = message,
        this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
}
</script>
 
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: 70%;
  transform: translate(-50%, -50%);

  z-index: 999;
  padding: 5px 10px;

  background-color: rgba(128, 128, 128, 0.9);
  color: white;
  border-radius: 5px;
}

.toast-msg {
  font-size: 15px;
  line-height: 25px;

  /* word-break:break-all 会截断单词*/
  /* word-break: break-all; */
  /*break-word保留单词， normal-单词过长时可撑开容器*/

  word-wrap: break-word;
}
</style>