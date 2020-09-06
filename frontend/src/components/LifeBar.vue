<template>
  <div class="progress-bar">
    <div
      class="progress-bar-bar"
      :style="{width: life + '%'}"
      :class="{'bar--danger': life < 20}"
    />
  </div>
</template>

<script>
export default {
  props: ['life'],
}
</script>

<style scoped>
  .progress-bar {
    height: 23px;
    border-radius: 20px;
    border: 2px solid rgba(250, 250, 255, 0.09);
  }

  .progress-bar-bar {
    height: 100%;
    border-radius: 20px;
    background-color: #A1DD70;
    transition: width 0.2s ease-in-out;
  }

  .bar--danger {
    background-color: #FF5959;
  }

</style>