// Import the `locale` object from the `../../ko.11tydata` module. This object likely contains data specific to the Korean locale.
const {locale} = require('../../ko.11tydata');

// Import the `tag11tyData` function from the `../../../_utils/tag-11tydata` module. This function generates 11ty data for a given set of tags.
const tag11tyData = require('../../../_utils/tag-11tydata');

// Export the `tag11tyData` function, passing in the `locale` object as an argument. This will generate 11ty data for the Korean locale based on the input tags.
module.exports = tag11tyData(locale);
