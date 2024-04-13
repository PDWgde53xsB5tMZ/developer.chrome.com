// Import the required modules: the 'locale' object from '../zh.11tydata' and the 'tags11tyData' function from '../../_utils/tags-11tydata'.
const {locale} = require('../zh.11tydata');
const tags11tyData = require('../../_utils/tags-11tydata');

// Call the 'tags11tyData' function with the 'locale' object as its argument, and export the result.
module.exports = tags11tyData(locale);

// This line is necessary to indicate that the file is a CommonJS module and should be interpreted using the Node.js module system.
// The module exports a single function that generates 11ty data for tags using a specific locale.
