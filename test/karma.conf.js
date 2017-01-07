module.exports = function (config) {
	config.set({
        singleRun: true,
        basePath: '../',
        urlRoot: '/_karma/',
        frameworks: ['mocha', 'chai', 'riot'],
        plugins: [
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-phantomjs-launcher',
            'karma-babel-preprocessor',
            'karma-chai',
            'karma-riot'
        ],

        files: [
            'node_modules/chai/chai.js',
            'src/**/*.tag',
            'test/spec/*.js',
            { pattern: 'assets/**/*', included: false, served: true, watched: false }
        ],

        proxies: {
            "/": "/assets/"
        },

        preprocessors: {
            '**/*.tag': 'riot'
        },

        browsers: ['PhantomJS'],
        reporters: ['mocha'],
        failOnEmptyTestSuite: false
	})
}