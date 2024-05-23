// <gamedev-dropdown [:open="false"] label="some text">
//   content
// </gamedev-dropdown>
app.component('gamedev-dropdown', {
props: {
  open: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  }
},
template: `
<div class="gamedev-dropdown">
  <button>
    <h3 :class="arrowClass" @click="dropdown">{{ label }}</h3>
  </button>
  <div :class="contentClass">
    <slot></slot>
  </div>
</div>
`,
data() {
  return {
    closed: !this.open, // default based on optional open property
  }
},
methods: {
  dropdown() {
    this.closed = !this.closed;
  }
},
computed: {
  arrowClass() {
    return {
      closed: this.closed,
      open: !this.closed
    }
  },
  contentClass() {
    return {
      hidden: this.closed
    }
  }
}
});
