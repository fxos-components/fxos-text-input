# &lt;fxos-text-input&gt; [![](https://travis-ci.org/fxos-components/fxos-text-input.svg)](https://travis-ci.org/fxos-components/fxos-text-input)

## Installation

```bash
$ npm install fxos-text-input
```

## Examples

- [Example](http://fxos-components.github.io/fxos-text-input/)

## Theming

Use this component is conjuction with [fxos-theme](fxos-components/fxos-theme), or use the following public theme hooks.

```css
body {
  --fxos-text-input-color: black;
  --fxos-text-input-border-color: black;
  --fxos-text-input-background: white;
  --fxos-text-input-background-disabled: grey;
  --fxos-text-input-placeholder-color: black;
  --fxos-text-input-clear-color: white;
  --fxos-text-input-clear-background: grey;
  --fxos-text-input-focus-color: blue;
}
```

## Localization

If you are using fxos-text-input you need to provide a label for a "Clear" button that is represented as
an icon. If you are using localization mechanism provided by Firefox OS, you simply need to add the
label entry in your app's message bundle for "FXOSTextInputClear"

```
// If using .l20n format:
<FXOSTextInputClear ariaLabel: "Clear">
```

```
// If using .properties format:
FXOSTextInputClear.ariaLabel = Clear
```

## Readiness

- [x] Accessibility ([@yzen](https://github.com/yzen))
- [x] Localization ([@yzen](https://github.com/yzen))
- [ ] Test Coverage
- [ ] Performance
- [ ] Visual/UX
- [ ] RTL

## Developing locally

1. `git clone https://github.com/fxos-components/fxos-button.git`
2. `cd fxos-button`
3. `npm install` (NPM3)
4. `npm start`

## Tests

1. Ensure Firefox Nightly is installed on your machine.
2. To run unit tests you need npm >= 3 installed.
3. `$ npm install`
4. `$ npm run test-unit`

If your would like tests to run on file change use:

`$ npm run test-unit-dev`

If your would like run integration tests, use:
`$ export FIREFOX_NIGHTLY_BIN=/absolute/path/to/nightly/firefox-bin`
`$ npm run test-integration`

## Lint check

Run lint check with command:

`$ npm run test-lint`
