
/**
 * Dependencies
 */

var component = require('fxos-component');
require('fxos-icons');

/**
 * Mini logger
 *
 * @type {Function}
 */
var debug = 0
  ? (...args) => console.log('[fxos-text-input]', ...args)
  : () => {};

/**
 * Exports
 */

module.exports = component.register('fxos-text-input', {
  created() {
    this.setupShadowRoot();

    this.els = {
      inner: this.shadowRoot.querySelector('.inner'),
      input: this.shadowRoot.querySelector('input'),
      clear: this.shadowRoot.querySelector('.clear')
    };

    this.type = this.getAttribute('type');
    this.inputmode = this.getAttribute('x-inputmode');
    this.disabled = this.hasAttribute('disabled');
    this.clearable = this.hasAttribute('clearable');
    this.placeholder = this.getAttribute('placeholder');
    this.required = this.getAttribute('required');
    this.maxlength = this.getAttribute('maxlength');
    this.value = this.getAttribute('value');

    // Don't take focus from the input field
    this.els.clear.addEventListener('mousedown', e => e.preventDefault());

    this.els.clear.addEventListener('click', e => this.clear(e));
    this.els.input.addEventListener('input', e => this.onInput(e));

    // Use capturing to handle focus and blur of fxos-text-input elements to
    // make sure that it is keyboard accessible.
    this.els.inner.addEventListener('focus', e => this.onFocus(e), true);
    this.els.inner.addEventListener('blur', e => this.onBlur(e), true);
  },

  attached: function() {
    this.setupShadowL10n();
  },

  /**
   * Clear the field.
   *
   * @public
   */
  clear() {
    debug('clear');
    this.value = '';
    // Focus back on the input.
    this.focus();
    this.emit('clear');
  },

  /**
   * Focus the field.
   *
   * @public
   */
  focus() {
    debug('focus');
    this.els.input.focus();
  },

  /**
   * Unfocus the field.
   *
   * @public
   */
  blur() {
    debug('blur');
    this.els.input.blur();
  },

  /**
   * Runs when the field is focused.
   *
   * @private
   */
  onFocus(e) {
    debug('on focus');
    // If there is a preceding blur event, it needs to be cancelled because user
    // focus is still inside fxos-input.
    if (this.onBlurTimeout) {
      clearTimeout(this.onBlurTimeout);
      this.onBlurTimeout = null;
    }

    this.els.inner.classList.add('focused');
    this.emit('focus');
  },

  /**
   * Runs when the field is unfocused.
   *
   * @private
   */
  onBlur(e) {
    debug('on blur');
    // Delay blur just enough to check if the focus is still on one of
    // fxos-text-input's elements.
    this.onBlurTimeout = setTimeout(() => {
      this.onBlurTimeout = null;
      this.els.inner.classList.remove('focused');
      this.emit('blur');
    }, 75);
  },

  /**
   * Runs when the value of the
   * input is manually changed.
   *
   * @private
   */
  onInput() {
    debug('on input');
    this.onValueChanged();
  },

  /**
   * Runs when the values changes
   * programatically or via keystrokes.
   *
   * @private
   */
  onValueChanged() {
    debug('value changed');
    var hasValue = !!this.value.length;
    this.els.inner.classList.toggle('has-value', hasValue);
    this.emit('input');
  },

  /**
   * Emit a DOM event on the component.
   *
   * @param  {String} name
   * @param  {*} detail
   * @private
   */
  emit(name, detail) {
    var e = new CustomEvent(name, { detail: detail });
    this.dispatchEvent(e);
  },

  /**
   * Attributes
   */

  attrs: {
    type: {
      get: function() { return this.els.input.getAttribute('type'); },
      set: function(value) {
        if (!value) { return; }
        this.els.inner.setAttribute('type', value);
        this.els.input.setAttribute('type', value);
      }
    },

    inputmode: {
      get: function() { return this.els.input.getAttribute('x-inputmode'); },
      set: function(value) {
        if (!value) {
          this.els.input.removeAttribute('x-inputmode');
          return;
        }
        this.els.input.setAttribute('x-inputmode', value);
      }
    },

    placeholder: {
      get: function() { return this.field.placeholder; },
      set: function(value) {
        if (!value && value !== '') { return; }
        this.els.input.placeholder = value;
      }
    },

    clearable: {
      get: function() { return this._clearable; },
      set: function(value) {
        var clearable = !!(value === '' || value);
        if (clearable === this.clearable) { return; }

        if (clearable) this.setAttr('clearable', '');
        else this.removeAttr('clearable');

        this._clearable = clearable;
      }
    },

    value: {
      get() { return this.els.input.value; },
      set(value) {
        debug('set value', value);
        this.els.input.value = value;
        this.onValueChanged();
      }
    },

    required: {
      get() { return this.els.input.required; },
      set(value) { this.els.input.required = value; }
    },

    maxlength: {
      get() { return this.els.input.getAttribute('maxlength'); },
      set(value) { this.els.input.setAttribute('maxlength', value); }
    },

    disabled: {
      get() { return this.els.input.disabled; },
      set(value) {
        value = !!(value === '' || value);
        this.els.input.disabled = value;
      }
    }
  },

  template: `
    <div class="inner">
      <content select="label"></content>
      <div class="fields">
        <input type="text"/>
        <button class="clear" data-l10n-id="FXOSTextInputClear"></button>
        <div class="focus"></div>
      </div>
    </div>
    <style>
      :host {
        display: block;
        height: 40px;
        margin-top: 18px;
        margin-bottom: 18px;
        overflow: hidden;

        font-size: 17px;
        font-weight: 300;
        color:
          var(--fxos-text-input-color,
          var(--fxos-color));
      }

      .inner { height: 100% }

      label {
        font-size: 14px;
        display: block;
        margin: 0 0 4px 16px;
      }

      [disabled] label { opacity: 0.3 }

      .fields {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: solid 1px
          var(--fxos-text-input-border-color,
          var(--fxos-border-color, #999));
      }

      [type='search'] .fields {
        border-radius: 30px;
        overflow: hidden;
      }

      input {
        display: block;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 16px;
        margin: 0;
        border: 0;

        font: inherit;
        color: inherit;
        background:
          var(--fxos-text-input-background,
          var(--fxos-background, #fff));
      }

      input[disabled] {
        background: var(--fxos-text-input-background-disabled);
      }

      ::-moz-placeholder {
        font-style: italic;
        color: var(--fxos-text-input-placeholder-color, inherit);
      }

      .clear {
        position: absolute;
        offset-inline-end: 0;
        top: 0;

        display: none;
        width: 18px;
        height: 18px;
        padding: 0;
        margin: 0;
        border: solid 10px transparent;
        box-sizing: content-box;

        border-radius: 50%;
        background-clip: padding-box;
        pointer-events: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: visibility 0s 200ms, opacity 200ms;

        color: var(--fxos-text-input-clear-color, #fff);
        background-color: var(--fxos-text-input-clear-background, #999);
      }

      [clearable] .clear { display: block }

      [clearable].has-value.focused .clear {
        pointer-events: all;
        transition-delay: 0s;
        opacity: 1;
        visibility: visible;
      }

      .clear:before {
        content: 'close';
        display: block;

        font: normal 500 19px/16.5px 'fxos-icons';
        text-rendering: optimizeLegibility;
      }

      .focus {
        position: absolute;
        left: 0;
        bottom: 0px;

        width: 100%;
        height: 3px;

        transition: transform 200ms;
        transform: scaleX(0);
        visibility: hidden;
        background:
          var(--fxos-text-input-focus-color,
          var(--fxos-brand-color, #000));
      }

      [type='search'] .focus {
        border-radius: 0 0 60px 60px;
        left: 10px;
        width: calc(100% - 20px);
      }

      .focused .focus {
        transform: scaleX(1);
        transition-delay: 200ms;
        visibility: visible;
      }
    </style>`
});
