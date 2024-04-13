// Import the `locale` object from the `ja.11tydata` module in the parent directory.
const {locale} = require('../../ja.11tydata');

// Import the `tag11tyData` function from the `tag-11tydata` utility module in the grandparent directory.
const tag11tyData = require('../../../_utils/tag-11tydata');

// Export the result of calling the `tag11tyData` function with the `locale` object as an argument.
module.exports = tag11tyData(locale);



// This module exports a function that generates 11ty data for a specific tag and locale.
// It relies on the `tag11tyData` utility function to do most of the work.

// The `locale` object is imported from the `ja.11tydata` module in the parent directory.
// This object contains locale-specific data and configuration options for the 11ty data generator.

// The `tag11tyData` function is imported from the `tag-11tydata` utility module in the grandparent directory.
// This function takes a `locale` object as an argument and generates 11ty data for a specific tag and locale.

// The result of calling `tag11tyData(locale)` is exported from this module.
// This means that when another module imports this module, it will receive the 11ty data for the specified tag and locale.

