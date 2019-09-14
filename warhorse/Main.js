// components

// horse display in list
// <horse-display horse="horse"></horse-display>

Vue.component('horse-list-item', {
props: {
  horse: {
    type: Object,
    required: true
  },
},
template: `
<a class="columns is-mobile" @click="clicked">
  <div class="column is-2 is-hidden-mobile">
    <span class="icon">
      <i :class="icon"></i>
    </span>
  </div>
  <div class="column is-5">{{ horse.name }}</div>
  <div class="column is-1">{{ horse.health }}</div>
  <div class="column is-1-tablet is-2-mobile">{{ horse.speed }}</div>
  <div class="column is-3">{{ horse.training }}</div>
</a>
`,
computed: {
  icon() {
    switch(this.horse.size) {
      case 'Light':
        return 'fas fa-horse';
      case 'Medium':
        return 'fas fa-2x fa-horse';
      case 'Heavy':
        return 'fas fa-2x fa-horse-head';
    }
  }
},
methods: {
  clicked() {
    switch(War.state) {
      case global.states.train:
        this.train();
        break;
      case global.states.choose:
        this.choose();
        break;
      case global.states.battle:
        this.battle();
        break;
      default:
        console.log(War.state);
    }
  },
  train() {
    this.horse.increaseTraining();
    saveGame();
  },
  choose() {
    War.chooseHorse(this.horse);
  },
  battle() {
    War.chooseEnemy(this.horse);
  }
}
});

// horse display all data
// <horse-display-ext>

// horse list
Vue.component('horse-list', {
props: {
  stable: {
    type: Object,
    required: true
  }
},
template: `
<div>
  <div class="columns is-mobile">
    <div class="column is-2 is-hidden-mobile"><p>Size</p></div>
    <div class="column is-5"><p>Name</p></div>
    <div class="column is-1"><p>HP</p></div>
    <div class="column is-1-tablet is-2-mobile"><p>Spd</p></div>
    <div class="column is-3"><p>Lvl</p></div>
  </div>
  <horse-list-item
    v-for="horse of stable.horses"
    :horse="horse"
    :key="horse.id">
  </horse-list-item>
</div>
`
});

// helpful function
function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
}

// startup load
var global = JSON.parse(localStorage.getItem('warhorseSave')) || {
  id: 1, // unique id for horses, starting at 1,
  myHorses: [],
  enemyHorses: [],
  states: {
    none: 0,
    acquiring: 1,
    train: 2,
    choose: 3,
    battle: 4,
    combat: 5,
    RIP: 6
  },
}
// if you've run out of enemy horses, make some more
if (global.enemyHorses.length == 0) {
  let names = ['Achilles','The Pie','Trojan Horse','Xanthos','Flash','Concorde','Pegasus','Phantom','Meebo'];
  shuffle(names);
  for (var i = 0; i < 5; i++) {
    let horseType = irandom_range(0, 2);
    let horseList = [Light, Medium, Heavy];
    global.enemyHorses.push(new horseList[horseType](names[i]));
  }
}
// reload horses
function createHorses(horses) {
  let horseList = [];
  for (let horse of horses) {
    horseList.push(new Warhorse(
      horse.name,
      horse.size,
      horse.health,
      horse.speed,
      horse.id,
      horse.training
    ));
  }
  return horseList;
}

// set up save
function saveGame() {
  global.myHorses = War.myStable.horses;
  global.enemyHorses = War.enemyStable.horses;
  global.RIP = War.RIPlist;
  //global.enemyHorses = this.enemyStable.horses;
  localStorage.setItem('warhorseSave', JSON.stringify(global));
}

// main app

var War = new Vue({
  el: '#war-game',
  data: {
    myStable: {
      horses: createHorses(global.myHorses)
    },
    enemyStable: {
      horses: createHorses(global.enemyHorses)
    },
    state: global.states.acquiring,
    states: global.states,
    error: "",
    myHorse: false,
    enemyHorse: false,
    combatLog: [],
    RIPlist: global.RIP || []
  },
  computed: {
    openStable() {
      switch(this.state) {
        case this.states.train:
        case this.states.choose:
          return this.myStable;
        case this.states.battle:
          return this.enemyStable;
      }
      return null;
    },
    caption() {
      if (this.enemyStable.horses.length == 0) {
        return 'You win!!';
      }
      switch(this.state) {
        case this.states.train:
          return 'My Stable';
        case this.states.choose:
          return 'Choose your fighter';
        case this.states.battle:
          return 'Pick an enemy';
        default:
          return 'Error';
      }
    }
  },
  methods: {
    trainHorses() {
      this.state = this.states.train;
    },
    acquireHorse() {
      this.state = this.states.acquiring;
      this.$nextTick(() => document.getElementById("horse-name").focus());
    },
    addHorse() {
      this.error = "";
      let name = document.getElementById("horse-name").value;
      // limit to 20 characters
      if (name.length > 20) {
        this.error = "Name can't be more than 20 characters.";
        return;
      }
      // plz name your horse
      if (name.length == 0) {
        this.error = "Please give your horse a name.";
        return;
      }
      // choose a type and add horse
      let horseType = irandom_range(0, 2);
      let horseList = [Light, Medium, Heavy];
      this.myStable.horses.push(new horseList[horseType](name));
      // autosave
      saveGame();
      this.trainHorses();
    },
    battle() {
      this.state = this.states.choose;
    },
    chooseHorse(horse) {
      this.myHorse = horse;
      this.state = this.states.battle;
    },
    chooseEnemy(horse) {
      this.enemyHorse = horse;
      this.state = this.states.combat;
      this.combat();
    },
    combat() {
      this.combatLog = [];
      let turn = 0;
      let damage = 0;
      while (this.myHorse.health > 0 && this.enemyHorse.health > 0 && turn < 100) {
        if (turn % this.myHorse.speed == 0) {
          // attack enemy
          // it's so long it's annoying, so we use a damage multiplier of 2x
          damage = 2 * Math.round(this.myHorse.attack());
          this.combatLog.push(`${this.myHorse.name} deals ${damage} damage to ${this.enemyHorse.name}!`);
          this.enemyHorse.health -= damage;
        }
        if (turn % this.enemyHorse.speed == 0) {
          // enemy attacks you
          damage = 2 * Math.round(this.enemyHorse.attack());
          this.combatLog.push(`${this.enemyHorse.name} deals ${damage} damage to ${this.myHorse.name}!`);
          this.myHorse.health -= damage;
        }
        turn++;
      }
      // outcome of battle
      if (this.myHorse.health <= 0 && this.enemyHorse.health <= 0) {
        this.combatLog.push('It was a tie!');
      } else if (this.myHorse.health <= 0) {
        this.combatLog.push(`${this.myHorse.name} was defeated...`);
      } else if (this.enemyHorse.health <= 0) {
        this.combatLog.push(`${this.myHorse.name} defeated ${this.enemyHorse.name}!`)
      } else {
        this.combatLog.push('They fought for so long, the sun went down. To be continued another day...')
      }
      // add dead horses to RIP list
      if (this.myHorse.health <= 0) {
        // remove from stable
        this.myStable.horses = this.myStable.horses.filter(horse => horse !== this.myHorse);
        this.RIPlist.push(this.myHorse.name);
      }
      if (this.enemyHorse.health <= 0) {
        // remove from stable
        this.enemyStable.horses = this.enemyStable.horses.filter(horse => horse != this.enemyHorse);
      }
    },
    endCombat() {
      // autosave after battle is closed
      saveGame();
      this.state = this.states.choose;
    },
  }
});