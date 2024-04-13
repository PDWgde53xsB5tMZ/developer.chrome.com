// Import the stylelint-config-sass-guidelines configuration as a base
// for this configuration file. This will ensure that we follow best
// practices for writing Sass using stylelint.
extends: 'stylelint-config-sass-guidelines',

// Define a set of rules that will be used to lint this configuration file.
// These rules will be applied on top of the rules defined in the
// stylelint-config-sass-guidelines configuration.
module.exports = {
  // Define a set of rules that will be used to lint this configuration file.
  rules: {
    // Limit the maximum nesting depth of selectors to 2. This helps
    // to keep our Sass code organized and maintainable.
    'max-nesting-depth': 2,

    // Define a regular expression pattern that selectors must match
    // in order to be considered valid. This pattern is based on the
    // BEM (Block Element Modifier) methodology, which is a popular
    // way to write maintainable and scalable Sass code.
    'selector-class-pattern': BEM_PATTERN,

    // Define a regular expression pattern that placeholder variables
    // must match in order to be considered valid. This pattern is
    // based on the BEM methodology, which helps to keep our Sass code
    // organized and maintainable.
    'scss/percent-placeholder-pattern': BEM_PATTERN,

    // Allow selectors that use the attribute qualifier, such as
    // input[type=button], but disallow selectors that use the class
    // or id qualifiers, such as input.foo or input#foo. This helps
    // to ensure that our selectors are specific and predictable.
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ["attribute"],
      }
    ]
  }
};
