// Vue set up of Games page

let _i = 0;
for (let year in games_list) {
  for (let game of games_list[year]) {
    game.id = _i; // unique id allows vue to speed up loading
    game.current = 0; // current image
    _i++;
  }
}

// find the newest year up to this year
let _year = new Date().getFullYear();
while (!(_year in games_list)) {
  _year -= 1;
}

// sort tabs by number, string tabs at the end
let _years = Object.keys(games_list);
_years.sort((a, b) => {
  if (typeof a == "string") {
    return 0;
  } else if (typeof b == "string") {
    return 1;
  }
  return a - b;
});

Vue.component('gamedev-games-list', {
  template: `
  <div>
    <button
      v-for="year of years"
      class="year-tab"
      :class="[year==currentYear ? 'year-tab-current' : '']"
      @click="changeYear(year)">
      <h2>{{ year }}</h2>
    </button>

    <ul v-for="year of years" v-if="year==currentYear" class="year-page">

      <li v-for="game of games[year]" :key="game.id" class="game-card">
        <div class="game-cover-container">
          <div class="game-cover">
          <img
            :src="game.images[0]"
            @click="openGameDisplay(game)">
          </div>
        </div>
      </li>
      <transition name="appear">
        <gamedev-game-display
          v-if="currentGameOpen!=null"
          :game="currentGameOpen"
          @close="closeGameDisplay">
        </gamedev-game-display>
      </transition>

    </ul>
  </div>
  `,
  data() {
    return {
      years: _years,
      currentYear: _year,
      games: games_list,
      currentGameOpen: null
    }
  },
  methods: {
    // display some year's game list
    changeYear: function(year) {
      this.currentYear = year;
    },
    openGameDisplay: function(game) {
      this.currentGameOpen = game;
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.body.style.maxHeight = "100vh";
    },
    closeGameDisplay: function() {
    	this.currentGameOpen = null;
    	document.body.style.overflow = "auto";
    	document.body.style.position = "relative";
    }
  }
})