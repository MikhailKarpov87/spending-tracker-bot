module.exports = {
  transform: {
    '.(ts|tsx)': '<rootDir>/test/preprocessor.js',
  },
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  globalSetup: '<rootDir>/test/utils/setup.js',
  setupFilesAfterEnv: ['<rootDir>/test/utils/setupAfterEnv.js'],
  globalTeardown: '<rootDir>/test/utils/teardown.js',
  testEnvironment: '<rootDir>/test/environment.js',
};
