var tutorial = new Vue({
  el: '#main',
  data: {
    currentTab: 'Update Games List',
    tabs: ['Update Games List', 'Create Pages', 'Component Properties'],
    webTemplate: [
      ['<!DOCTYPE html>', 'Specify document type'],
      ['<html lang="en">', 'Open tag: html, language is English'],
      ['<head>', 'Open tag: head of document'],
      ['  <meta charset="utf-8">', 'Choose character encoding'],
      ['  <meta name="viewport" content="width=device-width, initial-scale=1">', 'Scale for mobile devices'],
      ['  <link rel="shortcut icon" href="ui/logo.ico" type="image/x-icon">', 'link to the icon that displays on the tab'],
      ['  <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700" rel="stylesheet">', 'link to the headings font'],
      ['  <link href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed:300" rel="stylesheet"> ', 'link to the main font'],
      ['  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">', 'link to the material design icons (you can leave this out if there are no icons on your page'],
      ['  <link href="css/main.css" rel="stylesheet">', 'link to the main css styles'],
      ['  <title>UMBC Game Developers Club</title>', 'title to display on the tab'],
      ['</head>', 'Close tag: head of document'],
      ['<body>', 'Open tag: body'],
      ['<div v-cloak id="gamedev-root">', 'root element - allows components to be used inside.'],
      ['  <gamedev-header></gamedev-header>', 'use header component'],
      ['  <main role="main" class="main">', 'Open tag: main container with the main class for padding'],
      ['    <p>Put the main content here!</p>', 'Sample content'],
      ['  </main>', 'Close tag: main div'],
      ['  <gamedev-footer></gamedev-footer>', 'use footer component'],
      ['</div>', 'end of root element'],
      ['<script src="js/vue.min.js"></script>', 'include vue to allow components to be used'],
      ['<!--INCLUDE COMPONENTS HERE-->', 'put your other component scripts here'],
      ['<script src="components/gamedev-template.js"></script>', 'include the header and footer'],
      ['</body>', 'Close tag: body'],
      ['</html>', 'Close tag: html']
    ]
  }
});