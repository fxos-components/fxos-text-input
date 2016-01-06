/* jshint maxlen: 100 */
/* global marionette, setup, test */

'use strict';

var assert = require('chai').assert;
marionette.plugin('helper', require('marionette-helper'));

marionette('fxos-text-input', function() {
  var client = marionette.client({
    profile: {
      prefs: {
        // Disable first time run UI
        'browser.feeds.showFirstRunUI': false,
        // Disable default browser check
        'browser.shell.checkDefaultBrowser': false,
        // Disable UI tutorial
        'browser.uitour.enabled': false,
        // Enable chrome debugging
        'devtools.chrome.enabled': true,
        'devtools.debugger.remote-enabled': true,

        // Load integration test page on startup
        'startup.homepage_welcome_url': __dirname + '/test-integration.html',

        // Allow loading test resources oudside of test/ directory
        // (e.g. bower-components)
        'security.fileuri.strict_origin_policy': false,

        // Enable web components
        'dom.webcomponents.enabled': true,
        // Enable touch events
        'dom.w3c_touch_events.enabled': 1
      }
    },
    desiredCapabilities: {
      raisesAccessibilityExceptions: true
    }
  });

  var components = [
    { selector: '#fxi1', enabled: true, formField: 'input', clearable: true},
    { selector: '#fxi2', enabled: true, formField: 'input', clearable: true},
    { selector: '#fxi3', enabled: true, formField: 'input', clearable: true},
    { selector: '#fxi4', enabled: true, formField: 'textarea'},
    { selector: '#fxi5', enabled: true, formField: 'input', transparent: true},
    { selector: '#fxi6', enabled: false, formField: 'input', clearable: true}
  ];

  /**
   * Perform a marionette operation and assert if an error is thrown.
   * @param  {Function} testFn operation to perform
   * @param  {String} message error message for the assert statement
   */
  function failOnA11yError(testFn, message) {
    try {
      testFn();
    } catch (err) {
      // Marionette raises an ElementNotAccessibleError exception when
      // raisesAccessibilityExceptions is set to true.
      assert(false, [message, err.message].join(' '));
    }
  }

  setup(function() {
    components.forEach(function(aComponent) {
      aComponent.element = client.findElement(aComponent.selector);
    });
  });

  test('fxos-text-inputs are present and are visible to the assistive ' +
    'technology', function() {
      components.forEach(function(aComponent) {
        // Element is found
        assert.ok(aComponent.element, aComponent.selector);
        // Element is visible to all (inlcuding assistive technology)
        failOnA11yError(function() {
          assert.isTrue(aComponent.element.displayed());
        }, 'fxos-text-input element should be visible both normally and to ' +
          'assistive technology.');

        client.switchToShadowRoot(aComponent.element);
        // Input is visible to all (inlcuding assistive technology)
        if (!aComponent.transparent) {
          failOnA11yError(function() {
            assert.isTrue(client.findElement(aComponent.formField).displayed());
          }, 'form field should be visible both normally and to assistive ' +
            'technology.');
        }
        // Input has a correct enabled state for all (inlcuding assistive
        // technology)
        failOnA11yError(function() {
          assert.equal(client.findElement(aComponent.formField).enabled(),
            aComponent.enabled, aComponent.selector);
        }, 'form field should have a correct enabled state both normally ' +
          'and for assistive technology.');
        // Clear button should not be visible to all (inlcuding assistive
        // technology)
        if (aComponent.clearable) {
          failOnA11yError(function() {
            assert.isFalse(client.findElement('.clear').displayed());
          }, 'clear button element should be hidden both normally and from ' +
            'assistive technology by default.');
        }
        client.switchToShadowRoot();
      });
    });

  test('fxos-text-input form field is accessible (no error thrown when ' +
    'clicking and tapping)', function() {
      ['click', 'tap'].forEach(function(action) {
        components.forEach(function(aComponent) {
          // The following checks for a form field will be performed on
          // tap/click:
          // * visible to the assistive technology
          // * enabled to the assistive technology
          // * not obstructed via pointer-events set to none
          // * focusable by the assistive technology
          // * named/labelled for the assistive technology
          // * support user actions (click/tap/etc) performed via assistive
          //   technology
          client.switchToShadowRoot(aComponent.element);
          if (!aComponent.transparent && aComponent.enabled) {
            failOnA11yError(function() {
              client.findElement(aComponent.formField)[action]();
              // After activating the form element it should become focused.
              client.executeScript(function() {
                return document.activeElement.wrappedJSObject;
              }, function(err, value) {
                assert.isTrue(
                  client.findElement(aComponent.formField).equals(value));
              });
            }, 'form field should be clickable/tappable by all users ' +
              'inculding users of assistive technology.');
          } else if (!aComponent.enabled) {
            try {
              client.findElement(aComponent.formField)[action]();
            } catch (err) {
              assert.isTrue(
                ['InvalidElementState',
                 'ElementNotAccessibleError'].indexOf(err.type) > -1,
                'disabled fxos-text-input is not clickable or tappable and ' +
                'clicking/tapping will result in an ' +
                'InvalidElementState/ElementNotAccessibleError respectively.');
              // Disabled form element should not focused.
              client.executeScript(function() {
                return document.activeElement.wrappedJSObject;
              }, function(err, value) {
                assert.isFalse(
                  client.findElement(aComponent.formField).equals(value));
              });
            }
          }
          client.switchToShadowRoot();
        });
      });
    });

  test('fxos-text-input clear button is accessible (no error thrown when ' +
    'clicking and tapping)', function() {
      ['click', 'tap'].forEach(function(action) {
        // The following checks for a clear button will be performed on
        // tap/click:
        // * visible to the assistive technology
        // * enabled to the assistive technology
        // * not obstructed via pointer-events set to none
        // * focusable by the assistive technology
        // * named/labelled for the assistive technology
        // * support user actions (click/tap/etc) performed via assistive
        //   technology
        var clearable = components[2];
        client.switchToShadowRoot(clearable.element);

        var formField = client.findElement(clearable.formField);
        failOnA11yError(function() {
          assert.isFalse(client.findElement('.clear').displayed());
        }, 'clear button element should be hidden both normally and from ' +
          'assistive technology by default.');

        // Find activate and type into the form field.
        formField.click();
        formField.sendKeys('test');
        assert.equal(formField.getAttribute('value'), 'test');

        failOnA11yError(function() {
            client.helper.waitForElement('.clear');
          }, 'clear button element should be visible to all, including ' +
            'assistive technology.');

        // Activate clear button.
        client.findElement('.clear')[action]();

        failOnA11yError(function() {
            client.helper.waitForElementToDisappear('.clear');
          }, 'clear button element should be hidden both normally and from ' +
            'assistive technology.');

        // Component's form field should be cleared.
        assert.equal(formField.getAttribute('value'), '');
        client.switchToShadowRoot();

        // Component's value should be cleared.
        assert.notOk(clearable.element.getAttribute('value'));
      });
    });
});
