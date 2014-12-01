/*global window,assert,suite,setup,teardown,sinon,test*/
/*jshint esnext:true*/

suite('GaiaInput', function() {
  'use strict';

  /**
   * Dependencies
   */

  var GaiaInput = window['gaia-text-input'];
  var container;

  setup(function() {
    this.sinon = sinon.sandbox.create();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  teardown(function() {
    this.sinon.restore();
    container.remove();
  });

  test('foo', function() {
    var el = new GaiaInput();

    console.log(el);
  });
});
