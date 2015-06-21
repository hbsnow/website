module.exports = function(
  $stateProvider,
  $locationProvider,
  $urlRouterProvider,
  $interpolateProvider
) {
  var ext = '.tpl.html';

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'index' + ext,
    data: {
      pageTitle: 'Home'
    }
  })
  .state('about', {
    url: '/about.html',
    templateUrl: 'about' + ext,
    data: {
      pageTitle: 'About'
    }
  })
  .state('work', {
    url: '/work.html',
    templateUrl: 'work' + ext,
    data: {
      pageTitle: 'Work'
    }
  })
  .state('blog', {
    url: '/blog.html',
    templateUrl: 'blog' + ext,
    data: {
      pageTitle: 'Blog'
    }
  })
  .state('blog-post', {
    url: '/blog/{slug:[a-z0-9-\.]+}',
    templateUrl: function($stateParams) {
      return 'blog/' + $stateParams.slug.replace('.html', ext);
    },
    data: {
      //
    }
  })
  .state('blog-tag', {
    url: '/blog/tag/{slug:[a-zA-Z0-9-\.]+}',
    templateUrl: function($stateParams) {
      return 'blog/tag/' + $stateParams.slug.replace('.html', ext);
    },
    data: {
      //
    }
  })
  .state('404', {
    url: '/404.html',
    templateUrl: '/404' + ext,
    data: {
      pageTitle: '404 Not Found'
    }
  });

  $urlRouterProvider
  .when('', '/')
  .otherwise(function($injector) {
    $injector.get('$state').go('404');
  });

  $locationProvider.html5Mode(true).hashPrefix('!');
  $interpolateProvider.startSymbol('{[[');
  $interpolateProvider.endSymbol(']]}');
};
