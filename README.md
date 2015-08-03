[![Build Status](https://travis-ci.org/zentetsukenz/angular-splash-loading.svg)](https://travis-ci.org/zentetsukenz/angular-splash-loading)

# Angular Splash Loading

An AngularJS service splash screen with loading indicator. It uses [angular-ui-bootstrap $modal](http://angular-ui.github.io/bootstrap/#/modal) under the hood.

## Installation

Just install using bower

`bower install angular-splash-loading`

## Usage

1. Inject `splashLoading` service into your controller.
2. Use `splashLoading.open()` to open the splash screen. By default `splashLoading.open()` accepts an object that will be passed into `$modal` scope. The default template accepts property name called `title` and `message`. 
3. 

### Usage example

```javascript
var splashWait = splashLoading.open({
  title: 'Processing',
  message: 'Please wait...'
});

splashWait.opened.then(function () {
  Payment.someLongRunningAPI($scope.data).$promise
  .then(function () {
    // This is necessary, as the splash screen will not disappear if .close() is not called.
    splashWait.close({success: true});
  })
  // Just in case something happen.
  .catch(function () {
    splashWait.close({success: false});
  });
});
```

## Contributing to the project

Please follow [Contributing to open source](https://guides.github.com/activities/contributing-to-open-source/#contributing) for the contribution guidelines.

## License

Angular Splash Loading is under MIT license.
Please see [License file](https://github.com/zentetsukenz/angular-splash-loading/blob/master/LICENSE) for more information.
