/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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

// Import the `locale` object from the `ru.11tydata` module.
const {locale} = require('../ru.11tydata');

// Import the `tags11tyData` function from the `_utils/tags-11tydata` module.
const tags11tyData = require('../../_utils/tags-11tydata');

// Call the `tags11tyData` function with the `locale` object as its argument,
// and export the result.
module.exports = tags11tyData(locale);

