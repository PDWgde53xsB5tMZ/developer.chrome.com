// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Import the `locale` object from the `../../en.11tydata` module and the `tag11tyData` utility function from `../../../_utils/tag-11tydata`.
const {locale} = require('../../en.11tydata');
const tag11tyData = require('../../../_utils/tag-11tydata');

// Export the result of calling `tag11tyData` with the `locale` object as an argument.
module.exports = tag11tyData(locale);
