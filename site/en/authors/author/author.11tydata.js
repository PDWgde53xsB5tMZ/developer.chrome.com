/*
 * Copyright 2021 Google LLC
 *
 * This JavaScript file is licensed under the Apache License, Version 2.0 
 * (the "License"); you may not use this file except in compliance with 
 * the License. You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Importing the 'individual' utility function from '../../../_utils/individual'
const { individual } = require('../../../_utils/individual');

// Importing the 'locale' object from '../../en.11tydata'
const { locale } = require('../../en.11tydata');

// The 'pagination' object is being exported with a single property 'before'
module.exports = {
  pagination: {
    // The 'before' property is a function that takes an array of authors as an argument
    before: authors => {
      // The 'individual' utility function is called with the 'authors' array and 'locale' object as arguments
      return individual(authors, locale);
    },
  },
};

