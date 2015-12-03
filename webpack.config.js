
var externals = {
  'fxos-component': {
    root: 'fxosComponent',
    commonjs: 'fxos-component',
    commonjs2: 'fxos-component',
    amd: 'fxos-component'
  }
};

module.exports = [
  {
    externals: externals,
    entry: './src/fxos-text-input-multiline.js',
    output: {
      filename: 'fxos-text-input-multiline.js',
      library: 'FXOSTextInputMultiline',
      libraryTarget: 'umd'
    }
  },

  {
    externals: externals,
    entry: './src/fxos-text-input-pin.js',
    output: {
      filename: 'fxos-text-input-pin.js',
      library: 'FXOSTextInputPin',
      libraryTarget: 'umd'
    }
  },

  {
    externals: externals,
    entry: './src/fxos-text-input.js',
    output: {
      filename: 'fxos-text-input.js',
      library: 'FXOSTextInput',
      libraryTarget: 'umd'
    }
  }
];
