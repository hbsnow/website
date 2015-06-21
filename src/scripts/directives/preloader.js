module.exports = function($animate) {
  return {
    restrict: 'E',
    link: function(scope, element) {
      scope.$on('$viewContentLoaded',
      function(event) {
        $animate.leave(element[0]);
      });
    }
  };
};
