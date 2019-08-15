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
<div class="game-image-viewer">

  <div
    style="position:relative; flex-shrink:1; min-content:0"
    @mouseover="hovered=true"
    @mouseleave="hovered=false">

    <img :src="images[currentImage]" class="full-image">
    <img
      src="ui/arrow_left.png"
      v-show="images.length > 1 && hovered"
      class="overlay arrow-left"
      @click="showLeft()">
    <img
      src="ui/arrow_right.png"
      v-show="images.length > 1 && hovered"
      class="overlay arrow-right"
      @click="showRight()">

  </div>

  <ul v-if="images.length > 1" class="thumbs">
    <li v-for="image, index of images" :key="index" class="game-card">
      <div class="game-cover-container">
        <div class="game-cover">
          <img :src="image" @click="changeImage(index)" class="full-image">
        </div>
      </div>
    </li>
  </ul>

</div>
`,

data() {
  return {
    currentImage: 0,
    hovered: false,
  }
},

methods: {
  changeImage(index) {
    this.currentImage = index
  },
  showLeft() {
    if (this.currentImage > 0) {
      this.currentImage--;
    } else {
      this.currentImage = this.images.length - 1;
    }
  },
  showRight() {
    if (this.currentImage < this.images.length - 1) {
      this.currentImage++;
    } else {
      this.currentImage = 0;
    }
  }
}

});


Vue.component('gamedev-game-display', {

props: {
  game: {
    type: Object,
    required: true
  }
},

template: `
<div :style="fixed">
  <div class="game-columns modal-centered">
    <gamedev-image-viewer :images="game.images"></gamedev-image-viewer>
    <div class="scrollable">
      <h1>{{ game.name }}</h1>
      <div>
        <p v-if="game.links">Links:
          <a v-for="link of game.links" :href="link[1]">{{ link[0] }}</a>
        </p>
        <p v-if="game.description">{{ game.description }}</p>
        <p v-if="game.engine">Engine: {{ game.engine }}</p>
        <div v-if="game.roster">
          <p>Roster:</p>
          <ul>
            <li v-for="person of game.roster">{{ person }}</li>
          </ul>
        </div>
      </div>
      <img src="ui/close_button.png" class="overlay close-button" @click="close">
    </div>
  </div>
</div>
`,

methods: {
  close() {
    this.$emit('close')
  }
},

data() {
  return {
    fixed: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, .7)'
    },
  }
}

});