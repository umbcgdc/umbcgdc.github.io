// components:
// gamedev-image-viewer: image viewer, takes in a game and displays the images & vid
// gamedev-game-display: shows a game, includes an image viewer

Vue.component('gamedev-image-viewer', {

props: {
  video: {
    type: String,
    required: false
  },
  images: {
    type: Array,
    required: true
  }
},

template: `
<div>
  <p>Image Viewer</p>
  <img v-for="image of images" class="game-thumb" :src="image">
</div>
`

});


Vue.component('gamedev-game-display', {

props: {
  game: {
    type: Object,
    required: true
  }
},

template: `
<div>
  <p>This is the gamedev-game-display</p>
  <gamedev-image-viewer :images="game.images"></gamedev-image-viewer>
</div>
`

});