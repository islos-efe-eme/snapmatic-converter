module.exports = {
  globals: {
    'ts-jest': {
      'tsConfig': 'tsconfig.json',
    },
  },

  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
  ],

  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },

  testEnvironment: 'node',

  coverageThreshold: {
    global: {
      branches: 95,
      functions: 100,
      lines: 100,
      statements: 0,
    },
  },
}
