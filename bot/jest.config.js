module.exports = {
  transform: {
    '.(ts|tsx)': '<rootDir>/test/preprocessor.js',
  },
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
};
