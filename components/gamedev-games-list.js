// Vue set up of Games page

let _i = 0;
for (let year in games_list) {
  for (let game of games_list[year]) {
    game.id = _i; // unique id helps vue keep track of elements
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

    <span class="select-styler">
      <label for="year-select"><h3>Year:</h3></label>
      <select id="year-select" v-model="currentYear">
        <option v-for="year of years" :value="year" class="year-tab">
          {{ yearRange(year) }}
        </option>
      </select>
    </span>

    <ul class="year-page">

      <h1 class="text-centered">{{ yearRange(currentYear) }} Games</h1>

      <li v-for="game of games[currentYear]" :key="game.id" class="game-card">
        <div class="game-cover-container">
          <div class="game-cover" @click="openGameDisplay(game)">
            <img
              v-if="game.images"
              :src="game.images[0]"
            >
            <div v-else class="game-cover">
              <img src="ui/game_placeholder.jpg">
              <p class="game-title-text">{{ game.name }}</p>
            </div>
          </div>
        </div>
      </li>

    </ul>

    <transition name="appear">
      <div v-if="currentGameOpen!=null">
        <div class="modal-background" @click="closeGameDisplay">
        </div>
        <gamedev-game-display
          :game="currentGameOpen"
          @close="closeGameDisplay">
        </gamedev-game-display>
      </div>
  </transition>

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
    yearRange(year) {
      return year + '-' + (parseInt(year, 10) + 1);
    },
    openGameDisplay(game) {
      this.currentGameOpen = game;
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.body.style.maxHeight = "100vh";
      // update hash to contain game year and name
      let _hash_safe_name = game.name.replace(/\s/g, '-').toLowerCase();
      window.location.hash = this.currentYear + '-'+ _hash_safe_name;
    },
    closeGameDisplay() {
    	this.currentGameOpen = null;
    	document.body.style.overflow = "auto";
      document.body.style.position = "relative";
      // clear hash without jumping page
      window.location.hash = "-";
    }
  },
  created() {
    // check the hash to direct to a specific game (#2017-star-marten)
    let _hash = window.location.hash.slice(1).toLowerCase();
    if (_hash && _hash.length > 4) {
      let _hash_year = _hash.slice(0, 4);
      // use a regex to search in case game contains dashes instead of spaces
      let _re = new RegExp(_hash.slice(5).replace(/\-/g, '[\\s\\-]'), 'i');
      let _matches = games_list[_hash_year].filter(game => _re.test(game.name));
      // open game of first match
      if (_matches.length) {
        this.currentYear = _hash_year;
        this.openGameDisplay(_matches[0]);
      }
    }
  }
})