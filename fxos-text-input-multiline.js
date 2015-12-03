(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fxos-component"));
	else if(typeof define === 'function' && define.amd)
		define(["fxos-component"], factory);
	else if(typeof exports === 'object')
		exports["FXOSTextInputMultiline"] = factory(require("fxos-component"));
	else
		root["FXOSTextInputMultiline"] = factory(root["fxosComponent"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Dependencies
	 */

	var component = __webpack_require__(1);

	/**
	 * Exports
	 */

	module.exports = component.register('fxos-text-input-multiline', {
	  created() {
	    this.setupShadowRoot();

	    this.els = {
	      inner: this.shadowRoot.querySelector('.inner'),
	      field: this.shadowRoot.querySelector('textarea')
	    };

	    this.type = this.getAttribute('type');
	    this.disabled = this.hasAttribute('disabled');
	    this.placeholder = this.getAttribute('placeholder');
	    this.required = this.getAttribute('required');
	    this.value = this.getAttribute('value');
	  },

	  clear(e) {
	    this.value = '';
	  },

	  attrs: {
	    placeholder: {
	      get() { return this.els.field.placeholder; },
	      set(value) { this.els.field.placeholder = value || ''; }
	    },

	    value: {
	      get() { return this.els.field.value; },
	      set(value) { this.els.field.value = value; }
	    },

	    required: {
	      get() { return this.els.field.required; },
	      set(value) { this.els.field.required = value; }
	    },

	    disabled: {
	      get() { return this.els.field.disabled; },
	      set(value) {
	        value = !!(value === '' || value);
	        this.els.field.disabled = value;
	      }
	    }
	  },

	  template: `<div class="inner">
	      <content select="label"></content>
	      <div class="fields">
	        <textarea></textarea>
	        <div class="focus focus-1"></div>
	        <div class="focus focus-2"></div>
	      </div>
	    </div>
	    <style>
	      textarea {
	        box-sizing: border-box;
	        border: 0;
	        margin: 0;
	        padding: 0;
	      }

	      :host {
	        display: block;
	        margin-top: var(--base-m, 18px);
	        margin-bottom: var(--base-m, 18px);
	        font-size: 17px;
	      }

	      /** Inner
	       ---------------------------------------------------------*/

	      .inner {
	        height: 100%;
	      }

	      /** Label
	       ---------------------------------------------------------*/

	      label {
	        font-size: 14px;
	        display: block;
	        margin: 0 0 4px 16px;
	      }

	      /**
	       * [disbled]
	       */

	      [disabled] label {
	        opacity: 0.3;
	      }

	      /** Fields
	       ---------------------------------------------------------*/

	      .fields {
	        box-sizing: border-box;
	        position: relative;
	        width: 100%;
	        height: 100%;

	        --gi-border-color:
	          var(--input-border-color,
	          var(--border-color,
	          var(--background-plus,
	          #e7e7e7)));

	        border-color:
	          var(--gi-border-color);

	        border:
	          var(--input-border,
	          var(--border,
	          1px solid var(--gi-border-color)));
	      }

	      /** Textarea
	       ---------------------------------------------------------*/

	      textarea {
	        display: block;
	        width: 100%;
	        height: 100%;
	        min-height: 86px;
	        padding: 10px 16px;
	        font-size: inherit;
	        border: none;
	        margin: 0;
	        font: inherit;
	        resize: none;

	        /* dynamic */

	        color:
	          var(--text-color, #000);

	        background:
	          var(--text-input-background,
	          var(--input-background,
	          var(--background-minus,
	          #fff)));
	      }

	      /**
	       * [disabled]
	       */

	      textarea[disabled] {
	        background: transparent;
	      }

	      /** Placeholder Text
	       ---------------------------------------------------------*/

	      ::-moz-placeholder {
	        font-style: italic;

	        color:
	          var(--input-placeholder-color, #909ca7);
	      }

	      /** Focus Bar
	       ---------------------------------------------------------*/

	      .focus {
	        position: absolute;
	        bottom: 0px;
	        width: 100%;
	        height: 3px;
	        transition: all 200ms;
	        transform: scaleX(0);
	        visibility: hidden;
	        background: var(--highlight-color, #000);
	      }

	      /**
	       * input:focus
	       */

	      :focus ~ .focus {
	        transform: scaleX(1);
	        transition-delay: 200ms;
	        visibility: visible;
	      }

	      .focus-2 {
	        top: 0;
	        bottom: auto;
	      }
	    </style>`
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;