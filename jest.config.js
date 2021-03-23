module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts?(x)',
    '!src/index.tsx',
    '!src/**/*.d.ts',
    '!src/reportWebVitals.ts',
    '!src/**/*.mock.ts',
    '!src/**/test*',
    '!src/**/mock/**.*',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/coverage/'],
  coverageReporters: ['html', 'text', 'lcov', 'text-summary'],
  coverageThreshold: {
    global: {
      branches: 74,
      functions: 74,
      lines: 80,
      statements: 80,
    },
  },
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.ts',
  },
};
