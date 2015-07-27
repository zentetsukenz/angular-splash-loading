'use strict';

describe('angular.splash.loading module', function () {
  var splashLoading;
  var $rootScope;
  var $modal;

  beforeEach(module('angular.splash.loading'));

  beforeEach(inject(function (_splashLoading_, _$rootScope_, _$modal_) {
    splashLoading = _splashLoading_;
    $rootScope = _$rootScope_;
    $modal = _$modal_;
  }));

  describe('splashLoading service', function () {
    it('should define method open', function () {
      expect(splashLoading.open).toBeDefined();
    });

    describe('open method', function () {
      it('should call $modal.open', function () {
        spyOn($modal, 'open');
        splashLoading.open();
        expect($modal.open).toHaveBeenCalled();
      });

      it('should open $modal', function () {
        expect(splashLoading.open().opened).toBeTruthy();
      });

      it('should not throw any errors', function () {
        spyOn($modal, 'open');
        splashLoading.open();
        expect($modal.open).not.toThrow();
      });

      it('should call $modal.open with correct default option', function () {
        spyOn($modal, 'open');

        var expectingOpts = {
          templateUrl: 'template/angular-splash-loading/content.html',
          windowTemplateUrl: 'template/angular-splash-loading/index.html'
        };

        splashLoading.open();
        expect($modal.open.calls.argsFor(0)[0]).toEqual(jasmine.objectContaining(expectingOpts));
      });

      it('should call $modal.open with correct option', function () {
        spyOn($modal, 'open');

        var args = {
          templateUrl: 'template/my-content.html',
          windowTemplateUrl: 'template/my-template-window.html'
        };
        splashLoading.open({}, args);
        expect($modal.open.calls.argsFor(0)[0]).toEqual(jasmine.objectContaining(args));
      });
    });
  });
});
