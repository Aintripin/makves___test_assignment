const React = require('react');

const lucideMock = new Proxy({}, {
  get: (target, key) => {
    // Return a dummy component for any icon requested
    const MockIcon = (props) => React.createElement('svg', { ...props, 'data-testid': `mock-icon-${key}` });
    MockIcon.displayName = `MockIcon(${key})`;
    return MockIcon;
  },
});

module.exports = lucideMock; 