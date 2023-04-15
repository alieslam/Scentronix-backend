module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/coverage/', '/dist/'],
    collectCoverage: true,
    collectCoverageFrom: ['**/scr/*.{ts,js}', '!**/node_modules/**'],
};
