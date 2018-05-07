
module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jasmine': true
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'extends': ['@ear/eslint-config'],
  'rules': {
    'func-names': ['off']
  },
  'plugins': ['jasmine']
};