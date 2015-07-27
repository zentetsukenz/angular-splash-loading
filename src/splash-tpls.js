'use strict';

angular
  .module('angular.splash.loading.tpls', [
    'template/angular-splash-loading/index.html',
    'template/angular-splash-loading/content.html'
  ]);

angular
  .module('template/angular-splash-loading/index.html', [])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/angular-splash-loading/index.html',
      '<section class="splash" ng-class="{\'splash-open\': animate}" ng-style="{\'z-index\': 9999, display: \'block\'}" ng-click="close($event)">' +
      '  <div class="splash-inner" ng-transclude></div>' +
      '</section>');
  }]);

angular
  .module('template/angular-splash-loading/content.html', [])
  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/angular-splash-loading/content.html',
      '<div class="splash-content text-center">' +
      '  <h1 ng-bind="title"></h1>' +
      '  <p class="lead" ng-bind="message"></p>' +
      '  <span class="text-3x"><i class="fa fa-spin fa-spinner"></i></span>' +
      '</div>');
  }]);
