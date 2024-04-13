// Import the `locale` object from the ko.11tydata module. This object likely contains
// data related to the Korean locale, such as translations or other locale-specific settings.
const {locale} = require('../ko.11tydata');

// Import the `tags11tyData` function from the tags-11tydata utility module. This function
// generates 11ty data for tags, using the provided locale object to provide any necessary
// translations or locale-specific formatting.
const tags11tyData = require('../../_utils/tags-11tydata');

// Call the `tags11tyData` function with the `locale` object as its argument, and export the
// result. This will generate 11ty data for tags using the Korean locale.
module.exports = tags11tyData(locale);
