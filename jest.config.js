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
      branches: 65,
      functions: 95,
      lines: 95,
      statements: -1,
    },
  },
}
