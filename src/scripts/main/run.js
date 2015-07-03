module.exports = function($rootScope, $urlRouter, $state, $stateParams) {
  //$rootScope.$state = $state;
  //$rootScope.$stateParams = $stateParams;
  $rootScope.$on('$locationChangeSuccess', function() {
    $urlRouter.listen();
  });
};
