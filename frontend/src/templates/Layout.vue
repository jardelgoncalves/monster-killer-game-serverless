<template>
  <div class="layout" :class="{layout__center: center}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["center"]
}
</script>

<style>
  body {
    background-image: url("../assets/bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
    background-position: center top;
  }

  .layout {
    display: flex;
    flex-direction: column;
    height: 100%;
  } 

  .layout__center {
    align-items: center;
    justify-content: center;
  }
</style>