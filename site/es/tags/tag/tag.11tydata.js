// Import the `locale` object from the `es.11tydata` module.
const {locale} = require('../../es.11tydata');

// Import the `tag11tyData` utility function from the `tag-11tydata` module.
// This function generates 11ty data for a given tag.
const tag11tyData = require('../../../_utils/tag-11tydata');

// Export the `tag11tyData` function, passing in the `locale` object as an argument.
// This will generate 11ty data for the specified locale.
module.exports = tag11tyData(locale);
