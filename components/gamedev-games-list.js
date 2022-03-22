//

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
    
    <ul
      v-for="projects, category in games[currentYear]"
      :key="currentYear+category"
      class="year-page"
    >

      <h1 class="text-centered">{{ category }}</h1>

      <li v-for="game of projects" :key="currentYear+game.name" class="game-card">
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
      years: [],
      currentYear: 0,
      games: [],
      currentGameOpen: null
    }
  },
  methods: {
    async loadGames() {
      // get games from local file
      let response = await fetch('./games.json')
      this.games = await response.json()
      this.years = Object.keys(this.games);

      // find the newest year up to this year
      this.currentYear = new Date().getFullYear();
      while (!(this.currentYear in this.games)) {
        this.currentYear -= 1;
      }

      // sort tabs by number, string tabs at the end
      this.years.sort((a, b) => {
        if (typeof a == "string") {
          return 0;
        } else if (typeof b == "string") {
          return 1;
        }
        return a - b;
      });
    },
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
    this.loadGames().then(() => {
      // check the hash to direct to a specific game (#2017-star-marten)
      let _hash = window.location.hash.slice(1).toLowerCase();
      if (_hash && _hash.length > 4) {
        let _hash_year = _hash.slice(0, 4);
        // use a regex to search in case game contains dashes instead of spaces
        let _re = new RegExp(_hash.slice(5).replace(/\-/g, '[\\s\\-]'), 'i');
        for ([category, projects] of Object.entries(this.games[_hash_year])) {
          let _matches = projects.filter(game => _re.test(game.name));
          // open game of first match
          if (_matches.length) {
            this.currentYear = _hash_year;
            this.openGameDisplay(_matches[0]);
            break;
          }
        }
      }
    });
  }
})