<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(title, index) in titles" :key="title"
        :class="{active : currentIndex == index}"
        @click="itemClick(index)">
      <span>{{title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"TabControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      //记录当前选择的index
      currentIndex: 0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      //向父组件home传递切换事件
      this.$emit('tabClicked', index);
    }
  }
}
</script>

<style>
.tab-control{
  display: flex;
  text-align:center;
  font-size:15px;
  height:40px;
  line-height:40px;
  background-color: var(--color-background);
  /* TabControl的吸顶效果实现 */
  /* top设为44时，上方有漏出部分，原因未知 */
  position:sticky;
  top: 43.5px;
}

.tab-control-item{
  flex: 1;
}

.tab-control-item span{
  padding:5px;
}

.active{
  color: var(--color-high-text);
}

.tab-control-item.active span{
  border-bottom: 2px solid var(--color-high-text);
}
</style>