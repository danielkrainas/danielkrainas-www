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
            'client/components/*.tag',
            'test/spec/*.js',
            { pattern: 'public/**/*', included: false, served: true, watched: false }
        ],

        proxies: {
            "/": "/public/"
        },

        preprocessors: {
            '**/*.tag': 'riot'
        },

        browsers: ['PhantomJS'],
        reporters: ['mocha'],
        failOnEmptyTestSuite: false
	})
}