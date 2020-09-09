<template>
  <div class="ranking">
    <div class="ranking__content">
      <div class="ranking__content_header">
        <button @click="goBack">
          <font-awesome-icon icon="arrow-left" />
        </button>
        <h1>Ranking</h1>
      </div>
      <table>
        <tr>
          <th>Pos</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
        <tr v-for="(item, i) in data" :key="item.id">
          <td>{{ i + 1}}</td>
          <td>{{ item.username }}</td>
          <td>{{ convertHumanNumber(item.score)}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import humanNumber from 'human-number';
  

  import api from '../services/api'
  import { orderBy } from '../utils/order'

  export default {
    data() {
      return {
        data: []
      }
    },
    methods: {
      goBack() {
        return this.$router.go(-1)
      },
      async fetch() {
        try {
          const { data } = await api.get('ranking');
          const dataConvert = data.map(d => ({ ...d, score: Number(d.score) }))

          const dataOrder = orderBy(dataConvert, ['score'], ['desc']);
          this.data = dataOrder
        } catch (error) {
          console.log(error)
        }
      },
      convertHumanNumber(n) {
        return humanNumber(n)
      }
    },
    beforeMount() {
      this.fetch()
    }
  }
</script>

<style scoped>
  .ranking {
    display: flex;
    flex-direction: column;
    align-items: center;    
  }

  .ranking .ranking__content {
    display: flex;
    flex-direction: column;
    max-width: 640px;
    width: 100%;
    margin: 80px 0;
    padding: 0 20px;
  }

  .ranking__content_header {
    display: flex;
    align-items: center;
  }
  .ranking__content_header button {
    border: 2px solid #FFBC43;
    background-color: transparent;
    cursor: pointer;
    padding: 0 24px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
  }
  .ranking__content_header button:hover {
    background-color: #FFBC43;
  }

  .ranking__content_header button svg {
    color: #FFBC43;
  }
  .ranking__content_header button:hover svg {
    color: #fff;
  }

  .ranking__content_header button {
    transition: all 0.2s ease-in-out;
  }

  .ranking__content_header h1 {
    font-size: 40px;
    margin-left: 100px;
    color: #FFBC43;
    font-weight: 600;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 45px;
  }

  th, td {
    text-align: center;
    padding: 8px;
    color: #FFBC43;
  }

  th {
    background-color: rgb(255, 188, 67, 0.8);
    color: white;
    padding: 20px 0;
  }
</style>