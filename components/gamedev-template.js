// root element usable on all pages
const { createApp } = Vue;
const app = createApp({
  data() {
    return {
      theme: localStorage.getItem('theme') || 'dark-theme'
    }
  },
  created() {
    document.body.className = this.theme;
  },
  methods: {
    themeChange() {
      // update the theme when it's changed
      this.theme = document.body.className;
    }
  }
});

// <gamedev-nav></gamedev-nav>
app.component('gamedev-nav', {

template: `
<nav class="gamedev-nav">

  <button name="Menu" id="menu-button" @click="dropdown">
  <span :style="[hamburger, first]"></span>
  <span :style="[hamburger, middle]"></span>
  <span :style="[hamburger, last]"></span>
  </button>

  <div class="gamedev-nav-links desktop">
    <a v-for="link of links" :href="link[1]" style="margin-left:1em;">
      {{ link[0] }}
    </a>
    <button
      class="theme-change light"
      @click="changeTheme('light-theme')"
      name="Light Theme">
    </button>
    <button
      class="theme-change dark"
      @click="changeTheme('dark-theme')"
      name="Dark Theme">
    </button>
  </div>

  <transition name="appear">
    <div v-if="open" class="gamedev-nav-links mobile">
      <button
        class="theme-change light"
        @click="changeTheme('light-theme')"
        name="Light Theme">
      </button>
      <button
        class="theme-change dark"
        @click="changeTheme('dark-theme')"
        name="Dark Theme">
      </button>
      <a v-for="link of links" :href="link[1]">{{ link[0] }}</a>
    </div>
  </transition>

</nav>
`,

data() {
  return {
    links: [
      ["Home", "index.html"],
      ["About", "about.html"],
      ["Games", "games.html"],
      ["Resources", "resources.html"],
      ["Events", "events.html"],
      ["Contact", "contact.html"],
      ["Shop", "shop.html"]
    ],
    open: false,
    hamburger: {
      display: "block",
      width: "33px",
      height: "4px",
      marginBottom: "5px",
      background: "#a2a2a2",
      borderRadius: "3px",
      transformOrigin: "4px 0px",
      transition: `transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                   background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                   opacity 0.55s ease`
    },
    first: {
      transformOrigin: "0% 0%"
    },
    middle: {},
    last: {
      transformOrigin: "0% 100%"
    }
  }
},

methods: {
  dropdown() {
    this.open = !this.open;
    // transform hamburger button
    // credit @https://codepen.io/erikterwan/pen/EVzeRP
    if (this.open) {
      this.first.transform = "rotate(37deg)";
      this.middle.opacity = 0;
      this.middle.transform = "scale(0.2, 0.2)";
      this.last.transform = "rotate(-37deg)";
    } else {
      this.first.transform = "rotate(0deg)";
      this.middle.opacity = 1;
      this.middle.transform = "scale(1, 1)";
      this.last.transform = "rotate(0deg)";
    }
  },
  changeTheme(theme) {
    const body = document.body;
    if (body.className != theme) {
      body.className = theme;
      localStorage.setItem('theme', theme);
    }
    this.$emit('theme-change')
  }
},

});

// <header id="header">
//   <gamedev-header></gamedev-header>
// </header>
app.component('gamedev-header', {

template: `
<header :style="main">
  <div class="flex-row">
    <a href="index.html">
      <img
        class="full-image"
        src="ui/banner.png"
        alt="UMBC Game Developers Club">
    </a>
    <div>
      <img
        class="full-image"
        src="ui/learn.png" 
        alt="Learn. Create. Network. UMBC ENG 005| WED 12-1PM | FRI 1-5PM">
    </div>
  </div>
  <hr style="background-color: gray">
  <gamedev-nav @theme-change="themeChange"></gamedev-nav>
</header>
`,

data() {
  return {
    main: {
      backgroundColor: 'black',
      padding: '1% 2%'
    }
  }
},

methods: {
  themeChange() {
    this.$emit('theme-change')
  }
}

});

// <footer id="footer">
//   <gamedev-footer></gamedev-footer>
// </footer>

app.component('gamedev-footer', {

template: `
<footer style="padding-bottom: 2rem;">
  <hr style="margin-bottom: 2rem;">
  <div class="columns">
    <h3 class="column" style="margin-left:5%;">
      <a href="https://twitter.com/umbcGameDev/" class="icon-link">
        <img src="ui/twitter.png">
      </a>
      
      <a href="https://www.facebook.com/groups/umbcgamedev/" class="icon-link">
        <img src="ui/facebook.png">
      </a>

      <a href="https://www.instagram.com/umbcgamedevelopers/" class="icon-link">
        <img src="ui/instagram.png">
      </a>
      
      <a href="https://www.youtube.com/channel/UCIKfaNXsz7qUd366ayobr-Q/" class="icon-link">
        <img src="ui/youtube.png">
      </a>

      <a href="https://www.twitch.tv/umbcgamedev/" class="icon-link">
        <img src="ui/twitch.png">
      </a>

      <a href="mailto:umbcgamedev@gmail.com" class="icon-link">
        <img src="ui/mail.png">
      </a>
    </h3>
    <p class="column copyright">© UMBC Game Developers Club. All rights reserved.</p>
  </div>
</footer>
`

});

// load theme
var _theme = localStorage.getItem('theme');
if (_theme == 'light-theme') {
  document.body.className = 'light-theme';
}