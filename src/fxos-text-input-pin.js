
/**
 * Dependencies
 */

var component = require('fxos-component');

/**
 * Locals
 */

var DEFAULT_LENGTH = 4;
var DEFAULT_MAXLENGTH = 8;

/**
 * Exports
 */

module.exports = component.register('fxos-text-input-pin', {
  created() {
    this.setupShadowRoot();

    this.els = {
      inner: this.shadowRoot.querySelector('.inner'),
      fields: this.shadowRoot.querySelector('.fields'),
      input: this.shadowRoot.querySelector('input')
    };

    this.disabled = this.hasAttribute('disabled');
    this.length = this.getAttribute('length') || DEFAULT_LENGTH;
    this.maxlength = this.getAttribute('maxlength') || DEFAULT_MAXLENGTH;

    this.addEventListener('keyup', () => this.updateCells());
  },

  updateCells() {
    var l = this.els.input.value.length;
    var cellsLength = this.els.cells.length;
    if (l > cellsLength && l <= this.maxlength) {
      this.addCell();
    } else if (l < cellsLength && l >= this.length) {
      this.removeCell();
    }

    this.els.cells.forEach((cell, i) => {
      cell.classList.toggle('populated', i < l);
      cell.classList.toggle('focused', i == l);
    });
  },

  addCell() {
    var el = document.createElement('div');
    el.className = 'cell';
    this.els.fields.appendChild(el);
    this.els.cells.push(el);
  },

  removeCell() {
    var lastCell = this.els.cells.pop();
    this.els.fields.removeChild(lastCell);
  },

  onBackspace(e) {
    var input = e.target;
    var empty = !input.value;
    var previous = input.previousElementSibling;

    if (!empty && previous) {
      previous.clear();
      previous.focus();
    } else if (empty && previous) {
      previous.focus();
    }
  },

  setupFields() {
    this.els.fields.innerHTML = '';
    this.els.cells = [];

    for (var i = 0, l = this.length; i < l; i++) {
      this.addCell();
    }
  },

  clear(e) {
    this.value = '';
    while (this.els.cells.length > this.length) {
      this.removeCell();
    }
    this.updateCells();
  },

  focus(e) {
    this.els.input.focus();
  },

  /**
   * Attributes
   */

  attrs: {
    length: {
      get() { return this._length; },
      set(value) {
        value = Number(value);
        this._length = value;
        this.setupFields();
      }
    },

    maxlength: {
      get() { return this._maxlength; },
      set(value) {
        value = Number(value);
        this._maxlength = value;
        this.els.input.setAttribute('maxlength', this.maxlength);
      }
    },

    value: {
      get() { return this.els.input.value; },
      set(value) { this.els.input.value = value; }
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
      <div class="container">
        <input x-inputmode="digit"/>
        <div class="fields"></div>
      </div>
    </div>
    <style>
      :host {
        display: block;
        height: 40px;
        margin-top: var(--base-m, 18px);
        margin-bottom: var(--base-m, 18px);
        font-size: 40px;
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

      .container {
        position: relative;
        z-index: 0;
        height: 100%;
      }

      input {
        opacity: 0;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        z-index: 1;
      }

      .fields {
        display: flex;
        position: relative;
        height: 100%;
        margin-left: -1rem;
      }

      [disabled] + .fields {
        pointer-events: none;
      }

      .cell {
        position: relative;
        height: 100%;
        margin-left: 1rem;
        flex: 1;

        border: 1px solid
          var(--fxos-text-input-border-color,
          var(--fxos-border-color));
        background:
          var(--fxos-text-input-background,
          var(--fxos-background));
      }

      [disabled] + .fields .cell {
        background: none;
      }

      .cell:after {
        position: absolute;
        left: 50%;
        top: 50%;

        content: '';
        width: 14px;
        height: 14px;
        margin: -7px;

        border-radius: 50%;
        opacity: 0;
        background: currentColor;
      }

      .cell.populated:after { opacity: 1 }

      .cell:before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 3px;
        visibility: hidden;
        background:
          var(--fxos-text-input-focus-color,
          var(--fxos-brand-color, #000));
      }

      input:focus + .fields .cell:before { visibility: visible; }
    </style>`
});
