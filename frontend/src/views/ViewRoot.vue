<template>
  <app-layout center="true">
    <div class="root">
      <app-logo />
      <h1>Monster Killer</h1>
      <app-raised-button text="Get Start"></app-raised-button>
      <app-link text="Ranking" path="/ranking" class="view-link" />
    </div>
  </app-layout>
</template>

<script>
  import RaisedButton from '@/widgets/RaisedButton.vue';
  import Link from '@/widgets/Link.vue';
  import Layout from '@/templates/Layout.vue';
  import Logo from '@/components/Logo.vue';

  export default {
    components: {
      'app-layout': Layout,
      'app-link': Link,
      'app-raised-button': RaisedButton,
      'app-logo': Logo,
    }
  }
</script>

<style scoped>
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  .root h1 {
    color: #FFBC43;
    font-weight: 600;
    font-size: 40px;
    line-height: 49px;
    margin-top: 14px;
    margin-bottom: 32px;
  }

  .root .view-link {
    margin-top: 12px;
  }
</style>