/*
 * Copyright 2020 Google LLC
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

/**
 * Returns an object with two properties, `disable_algolia` and `noindex`, set to `true`.
 * This configuration is used in an Eleventy project to disable Algolia search and add a `noindex` meta tag to the generated HTML pages.
 *
 * @return {EleventyData} The object with `disable_algolia` and `noindex` properties.
 */
module.exports = {
  disable_algolia: true, // Set to true to disable Algolia search in the Eleventy project.
  noindex: true, // Set to true to add a `noindex` meta tag to the generated HTML pages.
};
