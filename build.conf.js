/**
 *  This file contains all of the user settings for the gulp build process
 */
module.exports = {

  srcJs: ['src/**/*.js'],
  srcCss: ['src/**/*.css'],
  tests: 'test/spec/**/*.js',
  buildFolder: 'dist',
  buildJsFilename: 'angular-splash-loading.js',
  buildCssFilename: 'angular-splash-loading.css',
  banner: '/*!\n' +
    ' * See LICENSE in this repository for license information\n' +
    ' */\n',
  closureStart: '(function(){\n',
  closureEnd: '\n})();'

};