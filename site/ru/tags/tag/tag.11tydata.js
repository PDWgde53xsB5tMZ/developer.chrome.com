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

// Import the `locale` object from the `../../ru.11tydata` module.
// This object contains data specific to the Russian locale.
const {locale} = require('../../ru.11tydata');

// Import the `tag11tyData` function from the `../../../_utils/tag-11tydata`
// module. This function generates 11ty data for a specified tag.
const tag11tyData = require('../../../_utils/tag-11tydata');

// Export the `tag11tyData` function, passing in the `locale` object as an argument.
// This will generate 11ty data for the Russian locale.
module.exports = tag11tyData(locale);
