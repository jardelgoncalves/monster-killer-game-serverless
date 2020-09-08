<template>
  <app-layout center="true">
    <div class="root">
      <h1>We need the warrior's name</h1>
      <app-input
        :value="username"
        :change="onInputChange"
        name="username"
        placeholder="Your name"
      />
      <app-raised-button
        text="Start Game"
        :click="fetch"
      />
    </div>
  </app-layout>
</template>

<script>
  import RaisedButton from '@/widgets/RaisedButton.vue';
  import Input from '@/widgets/Input.vue';
  import Layout from '@/templates/Layout.vue';

  import api from '../services/api'
  import constant from '../utils/constant'

  export default {
    components: {
      'app-layout': Layout,
      'app-raised-button': RaisedButton,
      'app-input': Input,
    },
    data() {
      return {
        username: ''
      }
    },
    methods: {
      onInputChange(e) {
        const { name, value } = e.target
        this[name] = value;
      },
      async fetch() {
        const user = { username: this.username };
        try {
          const { data } = await api.post('user', user);
          localStorage.setItem(constant.TOKEN, JSON.stringify(data))
          this.$router.push('/game')
        } catch(err) {
          console.log(err)
        }
      }
    },
    beforeCreate() {
      if (localStorage.getItem(constant.TOKEN)) {
        this.$router.push('/game')
      }
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
    max-width: 374px;
  }

  .root h1 {
    color: #A1A5D0;
    font-weight: 600;
    font-size: 40px;
    line-height: 49px;
    margin-bottom: 32px;
    text-align: center;
  }

  input {
    margin-bottom: 16px;
  }

  .root .view-link {
    margin-top: 12px;
  }
</style>