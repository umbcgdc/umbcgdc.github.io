// components:
// gamedev-image-viewer: image viewer, takes an array of images to display
// gamedev-game-display: shows a game, includes an image viewer

Vue.component('gamedev-image-viewer', {

props: {
  images: {
    type: Array,
    required: true
  }
},

template: `
<div>
  <div class="vertical columns" style="max-height:100%">

    <div
      class="image-viewer column"
      @mouseover="hovered=true"
      @mouseleave="hovered=false"
    >
      <div style="width:100%;">
        <img :src="images[currentImage]" class="full-image">
      </div>
      <img src="ui/arrow_left.png"
        v-show="images.length > 1 && hovered"
        class="overlay arrow-left"
        @click="showLeft()"
      >
      <img src="ui/arrow_right.png"
        v-show="images.length > 1 && hovered"
        class="overlay arrow-right"
        @click="showRight()"
      >
    </div>

    <div v-if="images.length > 1" class="column pa-0">
      <div class="columns mobile">
        <div
          v-for="(img, index) of images"
          :key="img"
          class="column pa-0"
          style="max-width:25%"
        >
          <div class="game-cover-container">
            <div class="game-cover">
              <img :src="img" @click="changeImage(index)">
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
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
<div class="modal columns">

  <gamedev-image-viewer
    :images="game.images"
    class="column two-thirds"
  >
  </gamedev-image-viewer>

  <div class="scrollable column" style="margin-left: 1em">
    <h1>{{ game.name }}</h1>
    <p v-if="game.tagline"><i>{{ game.tagline }}</i></p>
    <p v-if="game.links">
      <a v-for="link of game.links" :href="link.href" class="game-links">
        <i class="material-icons md-18">
          {{ link.icon || "link" }}
        </i>
        {{ link.text }}
      </a>
    </p>
    <p v-if="game.description" class="linebreaks">{{ game.description }}</p>
    <p v-if="game.engine">Engine: {{ game.engine }}</p>
    <div v-if="game.roster">
      <p>Roster:</p>
      <ul>
        <li v-for="person of game.roster">{{ person }}</li>
      </ul>
    </div>
    <div v-if="game.customhtml" v-html="game.customhtml"></div>
  </div>

  <img src="ui/close_button.png" class="overlay close-button" @click="close">

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