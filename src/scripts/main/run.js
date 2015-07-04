var run = function($rootScope, $urlRouter) {
  $rootScope.$on('$locationChangeSuccess', function() {
    $urlRouter.listen();
  });
};
run.$inject = ['$rootScope', '$urlRouter'];

module.exports = run;
