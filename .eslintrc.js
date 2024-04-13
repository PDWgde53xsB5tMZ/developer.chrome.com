// This module exports an object with ESLint configuration options.
module.exports = {
  // This line extends the ESLint configuration from the 'gts' package and
  // enables the 'ava/recommended' ruleset.
  extends: ['./node_modules/gts', 'plugin:ava/recommended'],

  // These parser options specify that the code in this module is written in
  // ECMAScript module syntax.
  parserOptions: {
    sourceType: 'module',
  },

  // This section defines global variables that are used in the code.
  // The 'ga' variable is set to true, indicating that it is a global variable.
  globals: {
    ga: true,
  },

  // This section defines the environments in which the code should be tested.
  // The 'browser' and 'node' environments are specified.
  env: {
    browser: true,
    node: true,
  },

  // This section defines the rules that the ESLint tool will use to check the
  // code for errors and inconsistencies.
  rules: {
    // This rule is disabled because AVA ignores folders or files with
    // underscores in their name by default. Since we have test paths like
    // /site/_data/… we need to disable this linter rule and enable these paths
    // in our ava.config.js.
    'ava/no-ignored-test-files': 0,

    // These rules are disabled because they check if your package requires
    // devDependencies. Since we're building an application and require
    // devDependencies in a lot of places, it makes sense to disable this rule.
    'node/no-unpublished-require': 0,
    'node/no-unpublished-import': 0,

    // This rule is disabled because even though we target Node v14 (and v12 also
    // supported modules), eslint still complains that modules are not yet
    // supported.
    'node/no-unsupported
