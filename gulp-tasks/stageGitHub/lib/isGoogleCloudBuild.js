/*
 * Copyright 2023 Google LLC
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
 * @fileoverview Simple helper to make sure those tasks are only run
 * on Google Cloud Build
 */

// The function `isGoogleCloudBuild()` checks if the code is running in the Google Cloud Build environment
function isGoogleCloudBuild() {
  // The `process.env.PR_NUMBER` is a property available in the Node.js process environment.
  // It is used to determine if the code is running in the Google Cloud Build environment.
  // If this property is not set, the function throws an error.
  if (!process.env.PR_NUMBER) {
    // The error message explains that the task is intended to run on Google Cloud Build,
    // which exports the $PR_NUMBER environment variable.
    // It suggests using 'npm run stage:personal' locally instead.
    throw new Error(
      'This task is intended to run on Google Cloud Build, which exports $PR_NUMBER. ' +
        'Use npm run stage:personal locally instead.'
    );
  }
}

// The `module.exports` object is a special object in Node.js that is used to export functions,
// objects, or values from a module.
// In this case, the `isGoogleCloudBuild()` function is exported.
module.exports = {isGoogleCloudBuild};
