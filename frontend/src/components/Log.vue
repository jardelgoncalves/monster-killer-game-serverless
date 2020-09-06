<template>
  <ul class="logs" v-if="logs.length">
    <li v-for="item in logs" :key="item.text" :class="item.cls">{{ item.text }}</li>
  </ul>
</template>

<script>
export default {
  props: {
    logs: {
      type: Array
    }
  }
}
</script>

<style scoped>
.logs {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logs li {
  padding: 0;
  margin: 0;
  padding: 12px;
  color: #fff;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin: 4px 0;
}

li.player {
  background: rgba(161, 221, 112, 0.66);
}

li.monster {
  background: rgba(85, 173, 254, 0.66);
}
</style>