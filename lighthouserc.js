// Exports an object containing configuration settings for Lighthouse CI.
module.exports = {
  // The 'ci' property is required and contains settings for Lighthouse CI.
  ci: {
    // The 'upload' property specifies where to upload the Lighthouse reports.
    upload: {
      // The 'target' property specifies the target for uploading the Lighthouse reports.
      target: 'temporary-public-storage',
    },
    // The 'collect' property contains settings for collecting Lighthouse data.
    collect: {
      // The 'startServerCommand' property specifies the command to start the server.
      startServerCommand: 'npm start',
      // The 'startServerTimeout' property specifies the timeout for starting the server.
      startServerTimeout: 60 * 1000, // Timeout is set to 60 seconds.
      // The 'url' property is an array of URLs to test with Lighthouse.
      url: [
        'http://localhost:8080/',
        'http://localhost:8080/blog/',
        'http://localhost:8080/docs/',
        'http://localhost:8080/docs/extensions/',
      ],
    },
    // The 'assert' property contains settings for Lighthouse assertions.
    assert: {
      // The 'preset' property specifies the Lighthouse preset to use.
      preset: 'lighthouse:no-pwa',
      // The 'assertions' property is an object containing Lighthouse assertions.
      assertions: {
        // The 'categories:performance' assertion checks the performance score.
        'categories:performance': ['error', {minScore: 0.9}],

        // The 'canonical' assertion checks the canonical URL.
        canonical: 'off',

        // The 'tap-targets' assertion is disabled until issue #71 is fixed.
        'tap-targets': 'off',

        // The 'unused-javascript' assertion checks for unused JavaScript.
        'unused-javascript': ['error', {maxLength: 2}],

        // The 'uses-rel-preconnect' assertion is disabled.
        'uses-rel-preconnect': 'off',

        // The 'uses-long-cache-ttl' assertion checks for long cache TTLs.
        'uses-long-cache-ttl': ['warn', {maxLength: 1}],
      },
    },
  },
};


