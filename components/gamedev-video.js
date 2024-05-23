// <gamedev-video src="#"></gamedev-video>

app.component('gamedev-video', {
props: {
  src: {
    type: String,
    required: true
  },
},
template: `
<div :style="video">
  <iframe
    :style="iframe"
    width="560"
    height="315"
    :src="src"
    frameborder="0"
    allow="autoplay; encrypted-media"
    allowfullscreen>
  </iframe>
</div>
`,
data() {
  return {
    video: {
      display: 'block',
      maxWidth: '100%',
      position: 'relative',
      height: '0',
      paddingBottom: '56.25%',
    },
    iframe: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    }
  }
}
});