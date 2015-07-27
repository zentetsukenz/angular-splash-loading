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
