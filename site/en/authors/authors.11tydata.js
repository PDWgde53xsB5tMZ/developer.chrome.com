/*
 * Copyright 2021 Google LLC
 *
 * This JavaScript file is covered by the Apache License, Version 2.0.
 * You may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Importing the 'locale' object from '../en.11tydata' module.
const {locale} = require('../en.11tydata');

// Importing the 'i18n' function from '../../_filters/i18n' module.
const {i18n} = require('../../_filters/i18n');

// The 'pagination' object is being exported with a single property 'before'.
// This 'before' property is a function that takes a single argument 'authors'.
module.exports = {
  pagination: {
    before: authors => {
      // The function sorts the 'authors' array based on the title of each author.
      // The title is fetched using the 'i18n' function and the 'locale' object.
      // The localeCompare() method is used to compare two strings in the current locale.
      return authors.sort((a, b) =>
        i18n(`i18n.authors.${a}.title`, locale).localeCompare(
          i18n(`i18n.authors.${b}.title`, locale)
        )
      );
    },
  },
};

