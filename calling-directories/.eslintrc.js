module.exports = {
  extends: ['next', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
  },
}
