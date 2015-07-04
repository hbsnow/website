var table = module.exports = function($state) {
  return {
    restrict: 'E',
    link: function(scope, element, attribute) {
      scope.$on('$viewContentLoaded',
      function(event) {
        if (element.hasClass('tableblock')) {
          element.wrap('<div class="table-responsive"></div>');
        }
      });
    }
  };
};
table.$inject = ['$state'];

module.exports = table;
