module.exports = function($state) {
  return {
    restrict: 'E',
    link: function(scope, element, attribute) {
      scope.$on('$viewContentLoaded',
      function(event) {
        element.wrap('<div class="table-responsive"></div>');
      });
    }
  };
};
