// WARHORSE BUT IT'S SIMPLE

// helper functions
function irandom_range(n1, n2) {
  if (n1 < n2) {
    var minn = Math.ceil(n1);
    var maxx = Math.floor(n2);
  } else {
    var minn = Math.ceil(n2);
    var maxx = Math.floor(n1);
  }
  return Math.floor(Math.random() * (maxx - minn + 1)) + minn;
}

const TRAINING = [
  'Untrained',
  'Saddle',
  'Green',
  'Intermediate',
  'Expert',
  'Master'
]

// constructors

function Warhorse(name, size, health, speed, id, training) {
  this.name = name || 'no name = cheat?';
  this.size = size;
  this.health = health;
  this.speed = speed;
  this.training = training || TRAINING[0];
  if (!id) {
    this.id = global.id++;
  }
}
Warhorse.prototype = {
  // returns training as number
  getTrainingLevel() {
    return TRAINING.indexOf(this.training);
  },
  // increases training level
  increaseTraining() {
    let trainingLevel = this.getTrainingLevel();
    if (trainingLevel == -1) {
      console.log('smh you cheater');
    } else if (trainingLevel < TRAINING.length - 1) {
      this.training = TRAINING[++trainingLevel];
    }
  },
  // calculates damage
  attack() {
    let damage = this.health / 6 + this.getTrainingLevel();
    if (this.kick) {
      damage += this.kick();
    }
    return damage;
  }
}

// specific horse type constructors

var baseHorse = new Warhorse('Base', 'None', 0, 0, -1);

function Light(name, health, speed, id) {
  let _health = health || irandom_range(60, 80);
  let _speed = speed || irandom_range(2, 3);
  Warhorse.call(this, name, "Light", _health, _speed, id);
}
Light.prototype = baseHorse;

function Medium(name, health, speed, id) {
  let _health = health || irandom_range(70, 90);
  let _speed = speed || irandom_range(3, 4);
  Warhorse.call(this, name, "Medium", _health, _speed, id);
}
Medium.prototype = baseHorse;

function Heavy(name, health, speed, id) {
  let _health = health || irandom_range(80, 100);
  let _speed = speed || irandom_range(4, 5);
  Warhorse.call(this, name, "Heavy", _health, _speed, id);
}
Heavy.prototype = baseHorse;
Heavy.prototype.kick = function() {
  return irandom_range(1, 3);
}