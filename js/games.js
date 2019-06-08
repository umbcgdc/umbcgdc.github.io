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

var all_games = new Vue({
  el: '#all-games',
  data: {
    years: _years,
    currentYear: _year,
    games: games_list,
    currentImageViewer: null,
    viewerHovered: false
  },
  methods: {
    // display some year's game list
    changeYear: function(year) {
      this.currentYear = year;
    },
    // closes the image viewer
    closeImageViewer: function() {
      this.currentImageViewer = null;
    },
    // toggles the image viewer based on what thumbnail was clicked
    toggleImageViewer: function(game, index) {
      // close viewer if the thumb that's being display was clicked
      if (this.currentImageViewer == game.id && game.current == index) {
        this.closeImageViewer();
      } else {
        game.current = index;
        this.currentImageViewer = game.id;
      }
    },
    // display previous image in image viewer
    showLeft: function(game) {
      if (game.current > 0) {
        game.current--;
      } else {
        game.current = game.images.length - 1;
      }
    },
    // display the next image in image viewer
    showRight: function(game) {
      if (game.current < game.images.length -1) {
        game.current++;
      } else {
        game.current = 0;
      }
    }
  }
})