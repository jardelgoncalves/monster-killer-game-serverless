<template>
  <div class="gameplay">
    <div class="row score">
      <app-panel class="score__panel">
        <app-icon icon="coin"  />
        <span>{{coin()}}</span>
      </app-panel>
    </div>
    <div class="row players">
      <app-panel>
        <h1>{{ username }}</h1>
        <app-life-bar :life="playerLife" />
        <div class="players__life">{{ playerLife }}%</div>
      </app-panel>
      <app-panel>
        <h1>Monster</h1>
        <app-life-bar :life="monsterLife"/>
        <div class="players__life">{{ monsterLife }}%</div>
      </app-panel>
    </div>
    <div
      class="row"
      :class="{result__win: monsterLife === 0, result__lost: playerLife === 0}"
      v-if="hasResult"
    >
      <app-panel class="result__panel">
        <div class="result__title" v-if="monsterLife === 0">You Win</div>
        <div class="result__title" v-else>Game over</div>
      </app-panel>
    </div>
    <div class="row">
      <app-panel>
        <div class="action">
          <template v-if="running">
            <app-action-button :click="() => attack()" text="Attack">
              <app-icon icon="attack"  />
            </app-action-button>
            <app-action-button :click="() => attack(true)" text="Special Attack" :specialAttack="true">
              <app-icon icon="special"  />
            </app-action-button>
            <app-action-button :click="healAndHurt" text="Heal" :heal="true">
              <app-icon icon="potion" />
            </app-action-button>
            <app-action-button :click="() => running = false" text="Leave" :leave="true">
              <app-icon icon="door"  />
            </app-action-button>
          </template>
          <template v-else>
            <app-raised-button :click="startGame" text="Start" />
          </template>
        </div>
      </app-panel>
    </div>
    <div class="row" v-if="logs.length">
      <app-panel>
        <app-log :logs="logs" />
      </app-panel>
    </div>
  </div>
</template>

<script>
  import humanNumber from 'human-number';
  
  import LifeBar from '@/components/LifeBar.vue';
  import Panel from '@/components/Panel.vue';
  import Log from '@/components/Log.vue';
  import ActionButton from '@/widgets/ActionButton.vue';
  import RaisedButton from '@/widgets/RaisedButton.vue';
  import Icon from '@/templates/Icon.vue';

  import api from '../services/api'
  import constant from '../utils/constant'
  import { random } from '../utils/random'
  import { abs } from '../utils/limit'

  export default {
    data() {
      return {
        username: 'Player',
        user: null,
        running: false,
        monsterLife: 100,
        playerLife: 100,
        logs: [],
        coins: 0,
      }
    },
    methods: {
      coin() {
        return humanNumber(this.coins)
      },
      startGame() {
        this.running = true;
        this.playerLife = 100
        this.monsterLife = 100
        this.logs = [],
        this.coins = 0
      },
      attack(special) {
        this.hurt('monsterLife', 5, 10, special, 'player')
      
        this.calculateCoins('i', random(5, 10), special)
        if (!this.monsterLife) return;
        this.hurt('playerLife', 8, 12, false, 'monster')
      },
      hurt(prop, min, max, special = false, cls) {
        const plusAttack = special ? 4 : 0;

        const _hurt = random(min + plusAttack, max + plusAttack);

        this[prop] = abs(this[prop] - _hurt, 0, 'max')
        if (cls === 'monster') {
          this.registerLog(`The Monster hit ${this.username} with ${_hurt} damage`, cls);
          return
        }
        this.registerLog(`${this.username} hit the monster with ${_hurt} damage`, cls);
      },
      healAndHurt() {
        this.heal(10, 15)
        this.calculateCoins('d', random(7, 12));
        this.hurt('playerLife', 7, 12, false, 'monster');
      },
      heal(min, max) {
        const heal = random(min, max);
        this.playerLife = abs(this.playerLife + heal, 100, 'min');
        this.registerLog(`${this.username} healed ${heal} of his life`, 'heal')
      },
      registerLog(text, cls) {
        this.logs.unshift({ text, cls });
      },
      calculateCoins(type = 'i', base = 10, special) {
        base = special ? base - 5: base

        this.coins =  type === 'i'
          ? this.coins += base * 250
          : abs(this.coins - (base * 100), 0, 'max')
      }
    },
    computed: {
      hasResult() {
        return this.monsterLife === 0 || this.playerLife === 0
      }
    },
    watch: {
      async hasResult(value) {
        if (value) {
          this.running = false

          if (!this.user || !this.user.id) {
            this.$router.push('/')
            return;
          }

          try {
            await api.post(`score/${this.user.id}`, {
              score: this.coins
            });
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    components: {
      'app-panel': Panel,
      'app-life-bar': LifeBar,
      'app-action-button': ActionButton,
      'app-raised-button': RaisedButton,
      'app-icon': Icon,
      'app-log': Log,
    },
    beforeMount() {
      if (!localStorage.getItem(constant.TOKEN)) {
        this.$router.push('/')
        return;
      }

      const user = JSON.parse(localStorage.getItem(constant.TOKEN));
      if (user && user.username) {
        this.user = user
        this.username = user.username;
      }
    }
  }
</script>

<style scoped>
  .gameplay {
    display: flex;
    flex-direction: column;
    padding: 20px 60px;
  }

  .score {
    flex-direction: row-reverse;
  }

  .score__panel {
    max-width: 300px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .score__panel span {
    margin-left: 12px;
    font-weight: 600;
    font-size: 20px;
    line-height: 27px;
    color: #ECEDF1;
  }

  .players h1 {
    margin: 8px 0;
    text-align: center;
  }

  .players .players__life {
    text-align: center;
    margin: 4px 0;
  }

  .players h1,
  .players__life {
    color: #A1A5D0;;
  }

  .row {
    display: flex;
    width: 100%;
  }

  .action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  .result__title {
    font-size: 40px;
    font-weight: 600;
    color: #fff;
    text-align: center;
  }

  .result__lost .result__panel {
    background-color: #FF5959;
  }

  .result__win .result__panel {
    background-color: #84bb56;
  }


  @media only screen and (max-width: 800px) {
    .gameplay {
      padding: 30px 20px;
    }
    .players {
      flex-direction: column;
    }
  } 
</style>