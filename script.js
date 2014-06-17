(function(define){define(function(require,exports,module){
'use strict';

/**
 * Dependencies
 */

var utils = require('gaia-component-utils');

/**
 * Locals
 */

var packagesBaseUrl = window.packagesBaseUrl || '/bower_components/';
var baseUrl = window.GaiaTextInputBaseUrl || packagesBaseUrl + 'gaia-text-input/';

var stylesheets = [
  { url: packagesBaseUrl + '/gaia-icons/style.css' },
  { url: baseUrl + 'style.css', scoped: true }
];

// Extend from the HTMLElement prototype
var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {
  var shadow = this.createShadowRoot();
  this._template = template.content.cloneNode(true);
  this._inner = this._template.getElementById('inner');
  this._input = this._template.getElementById('input');

  this.placeholder = this.getAttribute('placeholder');
  this.resettable = this.getAttribute('resettable');
  this.required = this.getAttribute('required');
  this.value = this.getAttribute('value');
  this.type = this.getAttribute('type');

  // Don't take focus from the input field
  var reset = this._template.getElementById('reset');
  reset.addEventListener('mousedown', function(e) { e.preventDefault(); });
  reset.addEventListener('click', this.reset.bind(this));

  shadow.appendChild(this._template);
  utils.style.call(this, stylesheets);
};


Object.defineProperties(proto, {
  type: {
    get: function() { return this._input.type; },
    set: function(value) {
      if (!value) { return; }
      this._input.type = value;
    }
  },
  placeholder: {
    get: function() { return this._input.placeholder; },
    set: function(value) {
      if (!value) { return; }
      this._input.placeholder = value; }
  },
  value: {
    get: function() { return this._input.value; },
    set: function(value) { this._input.value = value; }
  },
  required: {
    get: function() { return this._input.required; },
    set: function(value) { this._input.required = value; }
  },
  resettable: {
    get: function() { return this._resettable; },
    set: function(value) {
      var resettable = value || value === '';
      if (resettable) { this._inner.setAttribute('resettable', ''); }
      else { this._inner.removeAttribute('resettable'); }
      this._resettable = resettable;
    }
  }
});

proto.reset = function(e) {
  this._input.value = '';
};

// HACK: Create a <template> in memory at runtime.
// When the custom-element is created we clone
// this template and inject into the shadow-root.
// Prior to this we would have had to copy/paste
// the template into the <head> of every app that
// wanted to use <gaia-textinput>, this would make
// markup changes complicated, and could lead to
// things getting out of sync. This is a short-term
// hack until we can import entire custom-elements
// using HTML Imports (bug 877072).
var template = document.createElement('template');
template.innerHTML = '<div class="inner" id="inner">' +
    '<input id="input" type="text">' +
    '<button class="reset icon icon-close" id="reset"></button>' +
  '</div>';

// Register and return the constructor
module.exports = document.registerElement('gaia-text-input', { prototype: proto });

});})((function(n,w){return typeof define=='function'&&define.amd?
define:typeof module=='object'?function(c){c(require,exports,module);}:function(c){
var m={exports:{}},r=function(n){return w[n];};w[n]=c(r,m.exports,m)||m.exports;};})('gaia-text-input',this));