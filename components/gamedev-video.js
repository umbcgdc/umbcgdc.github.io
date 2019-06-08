// <gamedev-video src="#"></gamedev-video>

Vue.component('gamedev-video', {
props: {
  src: {
    type: String,
    required: true
  },
},
template: `
<div class="gamedev-video">
  <iframe
    width="560"
    height="315"
    :src="src"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
`
});