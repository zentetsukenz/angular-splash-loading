/*!
 * See LICENSE in this repository for license information
 */
(function(){
'use strict';

angular
  .module('angular.splash.loading', [
    'ui.bootstrap',
    'angular.splash.loading.service',
    'angular.splash.loading.tpls'
    ]);

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

'use strict';

angular
  .module('angular.splash.loading.service', [])
  .provider('splashLoading', function () {
    var defaultTemplate = {
      wrapper: 'template/angular-splash-loading/index.html',
      inner: 'template/angular-splash-loading/content.html'
    };

    this.setDefaultTemplate = function (templateObj) {
      defaultTemplate = templateObj;
    };

    this.$get = ['$modal', '$rootScope', function ($modal, $rootScope) {
      return {
        open: function (attrs, opts) {
          opts = opts || {};
          opts.templateUrl = opts.templateUrl || defaultTemplate.inner;
          opts.windowTemplateUrl = opts.windowTemplateUrl || defaultTemplate.wrapper;

          var scope = $rootScope.$new();
          angular.extend(scope, attrs);
          opts = angular.extend(opts, {
            backdrop: false,
            scope: scope
          });
          return $modal.open(opts);
        }
      };
    }];
  });

})();