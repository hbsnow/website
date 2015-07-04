var route = function($stateProvider, $urlRouterProvider) {
  var ext = '.tpl';

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'index' + ext,
      data: {
        pageTitle: 'Home'
      }
    })
    .state('about', {
      url: '/about/',
      templateUrl: 'about/index' + ext,
      data: {
        pageTitle: 'About'
      }
    })
    .state('work', {
      url: '/work/',
      templateUrl: 'work/index' + ext,
      data: {
        pageTitle: 'Work'
      }
    })
    .state('blog', {
      url: '/blog/',
      templateUrl: 'blog/index' + ext,
      data: {
        pageTitle: 'Blog'
      }
    })
    .state('blog-post', {
      url: '/blog/{slug:[a-z0-9-\.]+}/',
      templateUrl: function($stateParams) {
        return 'blog/' + $stateParams.slug + '/index' + ext;
      },
      data: {
        //
      }
    })
    .state('blog-tag', {
      url: '/blog/tag/{slug:[a-zA-Z0-9-\.]+}/',
      templateUrl: function($stateParams) {
        return 'blog/tag/' + $stateParams.slug + '/index' + ext;
      },
      data: {
        //
      }
    })
    .state('404', {
      templateUrl: '/404' + ext,
      data: {
        pageTitle: '404 Not Found'
      }
    });

  $urlRouterProvider
    .when('', '/')
    .otherwise(function($injector) {
      $injector.get('$state').go('404');
    })
    .deferIntercept();
};
route.$inject = ['$stateProvider', '$urlRouterProvider'];

module.exports = route;
