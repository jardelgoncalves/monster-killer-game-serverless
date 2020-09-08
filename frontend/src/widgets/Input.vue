<template>
  <input
    class="input"
    :name="name"
    :value="value"
    :placeholder="placeholder"
    @change="change"
  />
</template>

<script>
export default {
  props: {
    placeholder: { type: String },
    change: { type: Function },
    value: { type: String },
    name: { type: String },
  }
}
</script>

<style scoped>
  .input {
    background-color: #2F3578;
    color: #FFBC43;
    font-size: 18px;
    font-weight: 600;
    border: none;
    height: 60px;
    width: 100%;
    max-width: 374px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 0 8px;
  }
  .input::placeholder {
    color: #7175A2;
    font-weight: 400;
  }
</style>