module.exports = {
  'output': {
    'filename': '[name].js'
  },
  'module': {
    'loaders': [
      {
        'test': /\.jade$/,
        'loader': 'jade'
      }
    ]
  }
};
