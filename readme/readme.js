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
      ['<header id="header">', 'Open tag: semantic header element, also linked to Vue so components can be used in it'],
      ['  <gamedev-header></gamedev-header>', 'use header component'],
      ['</header>', 'Close tag: header'],
      ['<div id="main"> <!--MAIN CONTENT-->', 'Open tag: main div, components can be used in it'],
      ['<p>Put the main content here!</p>', 'Sample content'],
      ['</div> <!--END MAIN CONTENT-->', 'Close tag: main div'],
      ['<footer id="footer">', 'Open tag: semantic footer element, components can be used in it'],
      ['  <gamedev-footer></gamedev-footer>', 'use footer component'],
      ['</footer>', 'Close tag: footer'],
      ['<script src="js/vue.min.js"></script>', 'include vue to allow components to be used'],
      ['<!--INCLUDE COMPONENTS HERE-->', 'put your other component scripts here'],
      ['<script src="components/gamedev-template.js"></script>', 'include the header and footer'],
      ['</body>', 'Close tag: body'],
      ['</html>', 'Close tag: html']
    ]
  }
});