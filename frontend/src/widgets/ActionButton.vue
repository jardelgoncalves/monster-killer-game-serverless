<template>
  <div class="action__button" :class="{'special-attack': specialAttack, heal, leave }">
    <button>
      <slot></slot>
    </button>
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: ['text', 'specialAttack', 'heal', 'leave']
}
</script>

<style scoped>
  .action__button {
    width: 130px;
    height: 110px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 8px;
  }

  .action__button button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 2px solid #FFBC43;
    background-color: transparent;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .action__button button svg {
    width: auto;
    height: 60px;
  }

  .action__button span {
    margin-top: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #FFBC43; 
  }

  .action__button:hover button {
    background-color: #FFBC43;
  }

  .action__button.special-attack button {
    border: 2px solid #00C98C;
  }

  .action__button.special-attack span {
    color: #00C98C;
  }

  .action__button.special-attack:hover button {
    background-color: #00C98C;
  }

  .action__button.heal button {
    border: 2px solid #EE8A9F;
  }

  .action__button.heal span {
    color: #EE8A9F;
  }

  .action__button.heal:hover button {
    background-color: #EE8A9F;
  }

  .action__button.leave button {
    border: 2px solid #55ADFE;
  }

  .action__button.leave span {
    color: #55ADFE;
  }

  .action__button.leave:hover button {
    background-color: #55ADFE;
  }

</style>