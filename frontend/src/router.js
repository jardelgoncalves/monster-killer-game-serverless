import Vue from 'vue';
import VueRouter from 'vue-router'
import ViewRoot from './views/ViewRoot.vue';
import StartGame from './views/StartGame.vue';

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/', component: ViewRoot
  }, {
    path: '/start', component: StartGame
  }]
})