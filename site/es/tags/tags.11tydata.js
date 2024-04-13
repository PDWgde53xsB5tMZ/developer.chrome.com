// Import the 'locale' object from '../es.11tydata' module
const {locale} = require('../es.11tydata');

// Import the 'tags11tyData' function from '../../_utils/tags-11tydata' module
const tags11tyData = require('../../_utils/tags-11tydata');

// Call the 'tags11tyData' function with the 'locale' object as its argument
// and export the result
module.exports = tags11tyData(locale);

// This code is distributed under the Apache License, Version 2.0
// See https://www.apache.org/licenses/LICENSE-2.0 for details
