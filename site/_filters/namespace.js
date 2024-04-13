/*
 * Copyright 2020 Google LLC
 *
 * This code is licensed under the Apache License, Version 2.0. You may not use this
 * file except in compliance with the License. You may obtain a copy of the License
 * at the following location:
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Converts a namespace name (e.g., "chrome.foo.bar") into a path segment (e.g., "foo_bar").
 * This function is useful for creating file or directory names based on a namespace.
 *
 * @param {string} namespace - The namespace name to convert. This should be a string in
 * the format "prefix.identifier.identifier...". For example, "chrome.runtime".
 * @return {string} The converted path segment.
 */
function namespaceToPath(namespace) {
  // Check if the namespace starts with 'chrome.' prefix and remove it if present.
  if (namespace.startsWith('chrome.')) {
    namespace = namespace.substr('chrome.'.length);
  }

  // Replace all occurrences of '.' with '_' to create a path-compatible name.
  return namespace.replace(/\./g, '_');
}

// Export the function so it can be used in other modules.
module.exports = {namespaceToPath};
