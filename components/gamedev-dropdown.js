// <gamedev-dropdown [:open="false"] label="some text">
//   content
// </gamedev-dropdown>
Vue.component('gamedev-dropdown', {
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

// <gamedev-expand-all [label="" expand="Expand All" close="Close All"]>
//   content
// </gamedev-expand-all>
Vue.component('gamedev-expand-all', {
props: {
  label: {
    type: String,
    default: ''
  },
  expand: {
    type: String,
    default: 'Expand All'
  },
  close: {
    type: String,
    default: 'Close All'
  }
},
template: `
<div>
  <h1>
    {{ label }}
    <button @click="toggleAll">
      <h3>{{ closed ? expand : close }}</h3>
    </button>
  </h1>
  <slot></slot>
</div>
`,
data() {
 return {
   closed: true
 }
},
methods: {
  toggleAll() {
    let sectionDropdowns = this.$children;
    for (let dropdown of sectionDropdowns) {
      dropdown.closed = !this.closed;
    }
    this.closed = !this.closed;
  }
}
});