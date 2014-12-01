
module.exports = function(config) {
  config.set({
    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: { 'dom.webcomponents.enabled': true }
      }
    },

    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['firefox_latest'],
    client: { mocha: { 'ui': 'tdd' } },
    basePath: '../',

    files: [
      'test/setup.js',
      'gaia-text-input.js',
      'test/gaia-text-input.js'
    ]
  });
};
