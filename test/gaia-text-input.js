/*global assert,suite,setup,teardown,sinon,test*/
/*jshint maxlen:false*/

suite('GaiaInput', function() {
  'use strict';

  /**
   * Dependencies
   */

  var dom;

  setup(function() {
    this.sinon = sinon.sandbox.create();
    dom = document.createElement('div');
    document.body.appendChild(dom);
  });

  teardown(function() {
    this.sinon.restore();
    dom.remove();
  });

  suite('value attribute', function() {
    test('should set value on creation', function() {
      var el = create('value="foo"');
      assert.equal(el.value, 'foo');
    });

    test('should be the value of the inner <input>', function() {
      var el = create('value="foo"');
      var input = el.shadowRoot.querySelector('input');
      assert.equal(input.value, 'foo');
    });
  });

  suite('clearable >>', function() {
    var el;

    setup(function() {
      el = create('clearable');
    });

    test('the clear button is visible when the field is focused and has a value', function() {
      var clearButton = el.shadowRoot.querySelector('.clear');

      // Turn off transitions
      clearButton.style.transition = 'none';

      // Mock focused state as this will never
      // be triggered automatically as the
      // test browser window is backgrounded.
      // https://shanetomlinson.com/2014/test-element-focus-javascript/
      el.onFocus();

      el.value = '';
      assert.isTrue(isHidden(clearButton));

      el.value = '1';
      assert.isFalse(isHidden(clearButton));

      el.value = '123';
      assert.isFalse(isHidden(clearButton));

      el.value = '';
      assert.isTrue(isHidden(clearButton));
    });
  });

  suite('events >>', function() {
    var el;

    setup(function() {
      el = create('clearable');
    });

    test('it emits an input event when the value changes', function() {
      var spy = sinon.spy();

      el.addEventListener('input', spy);
      el.value = 'foo';

      sinon.assert.calledOnce(spy);
    });
  });

  /**
   * Utils
   */

  function create(attrs) {
    var div = document.createElement('div');
    div.innerHTML = `<gaia-text-input ${attrs}></gaia-text-input>`;
    var result = div.firstElementChild;
    dom.appendChild(result);
    return result;
  }

  function isHidden(el) {
    var style = getComputedStyle(el);
    return style.visibility === 'hidden'
      || style.display === 'none'
      || style.opacity === '0';
  }
});
