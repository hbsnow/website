'use strict';

require('angular');
require('angular-animate');
require('angular-ui-router');

var appName = 'mainApp';
var app = angular.module(appName, [
  'ngAnimate',
  'ui.router'
]);

app.config(require('./config.js'));
app.run(require('./run.js'));

app.directive('icon', require('./directives/icon.js'));
app.directive('pageTitle', require('./directives/page-title.js'));
app.directive('pageloader', require('./directives/pageloader/pageloader.js'));
app.directive('preloader', require('./directives/preloader.js'));
app.directive('table', require('./directives/table.js'));
