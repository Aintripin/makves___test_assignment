module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    // Handle CSS imports (and SASS/SCSS)
    '\\.(css|scss)$': 'identity-obj-proxy',

    // Handle static assets
    '\\.(png|jpg|jpeg|gif|svg|mp4)$': '<rootDir>/__mocks__/fileMock.cjs',
    
    // Mock for lucide-react icons
    '^lucide-react$': '<rootDir>/__mocks__/lucideMock.cjs'
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}; 