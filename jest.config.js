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
      branches: 45,
      functions: 70,
      lines: 75,
      statements: -16,
    },
  },
}
