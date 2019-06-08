-- WEBSITE GUIDE --
text version in case you don't feel like opening the html page for some reason.
===================


UPDATING THE GAMES LIST
-----------------------

To add games to the games list, you only need to edit "games_list.js", found in the home directory. Preferably, you would organize the images in images/year.
Looking at the existing games in the file should give you a good idea of how to add a game. It's possible you won't need to read this guide at all, so please take a look at the file.


-- Adding a tab to the list --

To add a tab (such as for a year), open the games_list.js file. The games are stored in an object which holds lists which holds more objects (lol).

Each key in the main object is a tab, so you just need to add a key-value pair for the tab name and the list of games under that tab.

"Tab Name": [
  // games will go in here, each game separated by a comma.
]

Tabs can be in any order, because they are automatically sorted by year and then alphabetically. The site will always open to the most recent year (it also will not overshoot).

-- Adding a game to a tab --
Each game is an unnamed object, so you write the properties of a game between curly braces {}. The only required property is "name".

"Tab Name": [
  { name: "Sample Game Title" },
  { name: "Another Game Title" },
]

Whitespace doesn't matter, so you can space out the properties however you want to make it more readable.


-- List of game properties --

Properties can be listed in any order. Remember to put a comma between each property.

:: name
   The title of the game. The only required property.

:: description
   A short description of the game.

:: engine
   The name of the engine that game was created in.

:: images
  A list containing links/file paths to images of the game. They are displayed in the order you write them in.

images: [
  "images/2018/some-image.png",
  "images/2018/some-other-image.png"
]

:: links
   A list containing pairs of link names and links. They are displayed in the order you write them in.

links: [
  ["link name", "https://www.google.com/"],
  ["other link", "https://duckduckgo.com/"]
]

:: roster
   List of people who worked on the game (credits).

roster: [
  "Me",
  "My friend"
]


-- Debugging --
If you open the file and there is no content on the page, make sure...
:: There are commas between every entry in the lists
:: There are commas between every property
:: There are commas between every tab
:: All brackets/braces of any kind have a matching end bracket/brace

If a specific entry you made isn't appearing on the page, make sure...
:: You saved the file
:: You reloaded the page
:: You're viewing the file and not the online website
:: The property name is spelled correctly
:: Everything that should be in quotes actually has quotes around it
:: Your content is inside the games_list and not before or after

You can always duplicate an existing game entry to use as a template.



CREATE PAGES
------------

This site currently uses a framework, Vue (https://vuejs.org/)! You only need to know basic html/css (and this guide) to use the components, but if you want to check out Vue, this tutorial series (https://www.vuemastery.com/courses/intro-to-vue-js/vue-instance/) is helpful.
Anyway, here's everything you need to know to use the gamedev components.


-- Setting up a page --
There's a file called template.html in the home directory that contains the page template with the header, footer, and head tags. Just duplicate it and change the content in the "main" div.

You can view an extended explanation of page content on the html version of this page.


-- Using the components --
Components are basically custom html elements, included through scripts. Once you include the template script, they can be used in the following elements:
:: #header
:: #main
:: #footer

The source files for the components are found in the "components" folder, and they all start with the prefix "gamedev-". Check them out if you're familiar with Vue or just want to look at the html templates and css classes.

To use components, you need 3 things:

:: Include Vue
The components require Vue to work, so you should include vue with:
   <script src="js/vue.min.js"></script>

:: Include the script of the component you want
Each component is contained in a js file that has to be included. Check the 'Component Properties' section for a full list of which components are in which file.
  <script src="components/gamedev-some-component.js"></script>

:: Include the template component
The template component creates a Vue element (necessary to use components). It also includes the header and footer components; they don't need to be included separately.
  <script src="components/gamedev-template.js"></script>

Then, you can use the components just like you would use a normal html element. For example, you can make a dropdown like this, and it automatically applies the styling and functionality of the dropdown component:
  <gamedev-dropdown label="Example label">
    <p>Some content here!</p>
  </gamedev-dropdown>

Check the 'Component Properties' section to see the properties of the different components/how to use them specifically.


-- Why didn't you use webpack/.vue files/something else? --
My main goal was to make the website as easy to edit as possible for someone with knowledge of only html5/css3. With this type of component registration, whoever is maintaining the website just has to include the scripts and then write html with a few extra elements, and there is (hopefully) no confusion over scoped css or the framework itself.


-- Additional notes --
If you end up inserting content using Vue's {{ mustaches }}, remember to include v-cloak on the element so the content won't show until Vue has loaded.

If you've created a different Vue root node for yourself, but want to use the main styling, you can use class="main" instead of id="main".

~~ Enjoy being Webmaster of the Game Developers Club! ~~



COMPONENT PROPERTIES
--------------------

List of Components and Properties

Properties in [ ] are optional.

Non-string properties must be listed with a colon in front, like :property="value".


-- Dropdown --

:: gamedev-dropdown
Creates a button you can click to show more content.
Properties:
  [open]: true if the dropdown should be open be default.
  label: the text on the dropdown.

:: gamedev-expand-all">
Creates a button you can click to open all dropdowns directly inside this component.
Properties:
  [label]: a section header if you want.
  [expand]: the text to display on the button. "Expand All" by default.
  [close]: the text to display on the button after it was clicked. "Close All" by default.

Example:
<gamedev-expand-all label="Header">
  <gamedev-dropdown :open="true" label="An open tab">
    <p>Some content</p>
  </gamedev-dropdown>
  <gamedev-dropdown label="A closed tab">
    <p>More content</p>
  </gamedev-dropdown>
</gamedev-expand-all>


-- Video --

:: gamedev-video
Lets you display a youtube video with just a link. Note that if the video is hidden when the page loads, youtube will not supply it with a high-quality thumbnail.

Properties:
  src: a link to the video.

Example:
<gamedev-video src="https://www.youtube.com/embed/?listType=playlist&list=UUIKfaNXsz7qUd366ayobr-Q"></gamedev-video>


-- Header and Footer --

The file "gamedev-template.js" contains a lot of components, but the only ones you will likely write on your page are "gamedev-header" and "gamedev-footer". Also, remember that components have to be in #header, #main, or #footer (unless you've created your own Vue instance).

:: gamedev-header
Inserts the entire header into the page. Please put it inside a header element, for semantic and accessibility reasons.

Example:
<header id="header">
  <gamedev-header></gamedev-header>
</header>

:: gamedev-footer
Inserts the footer into the page. Please put it inside a footer element, for semantic and accessibilty reasons.

Example:
<footer id="footer">
  <gamedev-footer></gamedev-footer>
</footer>
  </textarea>

:: gamedev-nav
Included in the header. Edit the "links" in the data if you need to add links to the nav.

:: gamedev-social
Included in the footer. If you need to add a social link, they're in the footer template.

Properties:
  image: the icon to display next to the link.
  [href]: the address to go to when the link is clicked.

<gamedev-social
  image="ui/twitter.png"
  href="https://twitter.com/umbcGameDev/">
  @umbcGameDev
</gamedev-social>