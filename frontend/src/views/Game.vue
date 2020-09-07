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
        <h1>Jogador</h1>
        <app-life-bar :life="100" />
        <div class="players__life">90%</div>
      </app-panel>
      <app-panel>
        <h1>Monster</h1>
        <app-life-bar :life="19"/>
        <div class="players__life">19%</div>
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
            <app-action-button text="Attack">
              <app-icon icon="attack"  />
            </app-action-button>
            <app-action-button text="Special Attack" :specialAttack="true">
              <app-icon icon="special"  />
            </app-action-button>
            <app-action-button text="Heal" :heal="true">
              <app-icon icon="potion" />
            </app-action-button>
            <app-action-button text="Leave" :leave="true">
              <app-icon icon="door"  />
            </app-action-button>
          </template>
          <template v-else>
            <app-raised-button text="Start" />
          </template>
        </div>
      </app-panel>
    </div>
    <div class="row">
      <app-panel>
        <app-log :logs="logs" />
      </app-panel>
    </div>
  </div>
</template>

<script>
  // import RaisedButton from '@/widgets/RaisedButton.vue';
  import Panel from '@/components/Panel.vue';
  import LifeBar from '@/components/LifeBar.vue';
  import Log from '@/components/Log.vue';
  import ActionButton from '@/widgets/ActionButton.vue';
  import RaisedButton from '@/widgets/RaisedButton.vue';
  import Icon from '@/templates/Icon.vue';
  import humanNumber from 'human-number';

  export default {
    data() {
      return {
        running: true,
        monsterLife: 0,
        playerLife: 100,
        logs: [
          { text: 'You hit the monster with 12 damage', cls: 'player' },
          { text: 'The Monster hit you with 11 damage', cls: 'monster' },
        ]
      }
    },
    methods: {
      coin() {
        return humanNumber(1100)
      }
    },
    computed: {
      hasResult() {
        return this.monsterLife === 0 || this.playerLife === 0
      }
    },
    watch: {
      hasResult(value) {
        if (value) this.running = false
      }
    },
    components: {
      // 'app-raised-button': RaisedButton,
      'app-panel': Panel,
      'app-life-bar': LifeBar,
      'app-action-button': ActionButton,
      'app-raised-button': RaisedButton,
      'app-icon': Icon,
      'app-log': Log,
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