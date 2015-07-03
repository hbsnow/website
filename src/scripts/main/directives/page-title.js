module.exports = function($state) {
  return {
    restrict: 'A',
    link: function(scope, element) {
      var title;
      var loading = 'Loading';

      scope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        var current = $state.current.data.pageTitle;
        title = '4uing';

        if(current === void 0) {
          title = loading;
        } else if(current !== 'Home') {
          title = current + ' | ' + title;
        }

        element.html(title);
      });

      scope.$on('$viewContentLoaded',
      function(event) {
        if(title === loading) {
          title = document.querySelector('#main-title').childNodes[0].nodeValue;
          element.html(title + ' | 4uing');
        }
      });
    }
  };
};
