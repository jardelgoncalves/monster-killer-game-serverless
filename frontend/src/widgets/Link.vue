<template>
  <a class="link" :href="path">{{ text }}</a>
</template>

<script>
export default {
  props: ['path', 'text']
}
</script>

<style scoped>
  .link {
    color: #FFBC43;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
    padding: 5px;
  }
  .link:hover {
    opacity: 0.8;
  }
</style>