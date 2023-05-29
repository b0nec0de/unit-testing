const config = {
    collectCoverage: true,
    coverageReporters: ['text-summary'],
    collectCoverageFrom: ['./unitTestingTask.js'],
    coveragePathIgnorePatterns: ['/node_modules/'],
    coverageThreshold: {
        './unitTestingTask.js': {
            functions: 80,
        },
    },
};

module.exports = config;
