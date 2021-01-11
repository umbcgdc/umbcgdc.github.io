// <gamedev-events feed="#" thumb-size="large"></gamedev-events>
// pulls myUMBC content from the feed

// for the myUMBC documentation check here https://my3.my.umbc.edu/groups/myumbc/files

const eventNodesToGet = ['PostedAt', 'Title', 'Tagline', 'Body', 'Summary', 'Website'];

Vue.component('gamedev-events', {
props: {
  feed: {
    type: String,
    required: true
  },
  thumbSize: {
    type: String,
    default: 'large'
  }
},
template: `
<div>
  <p v-if="loading">Loading myUMBC content...</p>

  <div v-else>
    <p v-show="xmlError">Error loading content.</p>
    <p v-show="events.length == 0">No myUMBC posts found.</p>

    <section v-for="event of events" class="columns">
      <div class="column">
        <img :src="event.ThumbnailUrl" class="full-image" />
        <p style="text-align: center">{{ event.PostedAt }}</p>
      </div>
      <div class="column two-thirds" style="padding-top: 0">
        <h2><a :href="event.url">{{ event.Title }}</a></h2>
        <h3>{{ event.Tagline }}</h3>
        <div v-html="event.Body"></div>
      </div>
    </section>
  </div>
</div>
`,
data() {
  return {
    feed: '',
    loading: true,
    xmlError: false,
    events: []
  }
},
created () {
  this.loadData();
},
methods: {
  loadData () {
    this.xmlError = false;

    fetch(this.feed)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => this.processData(data))
      .catch(() => { this.xmlError = true; this.loading = false });
  },
  processData(data) {
    // get list of myUMBC events
    let events = data.firstChild.children;

    if (events.length != 0) {
      let eventsObject = [];
      // put the info in the events into an object
      for (let event of events) {
        let eventData = { url: event.getAttribute('url') };
        for (let node of event.children) {
          let name = node.nodeName;
          // get any of the nodes from that array, plus the thumbnail
          if (eventNodesToGet.includes(name) || (name == 'ThumbnailUrl' && node.getAttribute('size') == this.thumbSize)) {
            eventData[name] = node.textContent;
            if (name == 'PostedAt') {
              eventData[name] = node.textContent.slice(0, -6);
            }
          }
        }
        eventsObject.push(eventData);
      }
      this.events = eventsObject;
    }

    this.loading = false;
  }
}
});