<template>
  <div class="panel">    
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
  .panel {
    background: #171E69;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 8px;
    padding: 20px;
    flex: 1;
  }
</style>