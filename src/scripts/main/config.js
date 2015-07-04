var config = function($locationProvider, $interpolateProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $interpolateProvider.startSymbol('{[[');
  $interpolateProvider.endSymbol(']]}');
};
config.$inject = ['$locationProvider', '$interpolateProvider'];

module.exports = config;
