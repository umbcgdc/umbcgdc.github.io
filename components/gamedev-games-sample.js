// recent games with images for the front page, start at random

app.component('gamedev-games-sample', {
  template: `
  <div>
    <article v-for="game of games" :style="styleBox">
      <Transition name="fade">
        <div v-if="games[current].name==game.name" :style="styleCard">
          <a :href="currentHref">
            <h3>{{ games[current].name }}</h3>
            <img :src="games[current].images[0]" :style="styleCardImage">
          </a>
        </div>
      </Transition>
    </article>
  </div>
  `,
  data() {
    return {
      year: null,
      games: [],
      current: 0,
      timer: null,
      styleBox: {
        position: 'relative'
      },
      styleCard: {
        textAlign: 'center',
        width: '100%',
        // keep the images at top during fade
        position: 'absolute',
        top: '0'
      },
      styleCardImage: {
        maxWidth: '100%',
        maxHeight: '30vh'
      }
    }
  },
  methods: {
    async loadGames() {
      // load games
      const response = await fetch('./games.json');
      const games = await response.json();

      // find the newest year up to this year
      let currentYear = new Date().getFullYear();
      while (!(currentYear in games)) {
        currentYear -= 1;
      }
      this.year = currentYear;

      // merge all game lists in year
      this.games = Object.values(games[currentYear])
        .flat()
        .filter(game => game.images);
      
      // pick a random game to show first
      this.current = Math.floor(Math.random() * this.games.length);
    },
    nextGame() {
      // gets the next game or loops to start
      if (this.current < this.games.length - 1) {
        this.current++;
      } else {
        this.current = 0;
      }
    }
  },
  computed: {
    currentHref() {
      // returns a link to the game that's currently being shown
      let _hash_safe_name = this.games[this.current].name.replace(/\s/g, '-').toLowerCase();
      let _hash = this.year + '-'+ _hash_safe_name;
      return `games.html#${_hash}`
    }
  },
  created() {
    this.loadGames();
  },
  mounted() {
    // show the next game every 3s
    this.timer = setInterval(() => {
      this.nextGame();
    }, 3000)
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
})