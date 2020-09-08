<template>
  <button class="raised__button" @click="click">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: { type: String },
    click: { type: Function },
  }
}
</script>

<style scoped>
  .raised__button {
    background-color: #FFBC43;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    border: none;
    height: 60px;
    width: 100%;
    max-width: 374px;
    border-radius: 8px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .raised__button:hover {
    opacity: 0.8;
  }
</style>