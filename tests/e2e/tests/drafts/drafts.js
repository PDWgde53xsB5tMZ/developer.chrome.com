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

// Import the required modules
const test = require('ava');
const fs = require('fs');
const path = require('path');

// Import the distPath and isTruthy functions from the utils.js and isTruthy.js modules
const {distPath} = require('../../utils.js');
const {isTruthy} = require('../../../../site/_utils/isTruthy.js');

// Disable the rule that disallows importing test files
// This is necessary because the test files are being imported as test cases
// eslint-disable-next-line ava/no-import-test-files

// Import the distPath and isTruthy functions from the utils.js and isTruthy.js modules
const {distPath} = require('../../utils.js');
const {isTruthy} = require('../../../../site/_utils/isTruthy.js');

// The first test case checks if the program outputs a non-draft file
test('Output a non-draft file', t => {
  // Define the file path for the non-draft file
  const filePath = path.join(distPath, 'en/drafts/not-a-draft/index.html');

  // Use the fs.statSync function to get the statistics for the file
  const statsObj = fs.statSync(filePath);

  // Check if the file exists by checking if the stats object is truthy
  t.truthy(statsObj);
});

// The second test case checks if the program outputs a past file
test('Outputs a past file', t => {
  // Define the file path for the past file
  const filePath = path.join(distPath, 'en/drafts/past-post/index.html');

  // Use the fs.statSync function to get the statistics for the file
  const statsObj = fs.statSync(filePath);

  // Check if the file exists by checking if the stats object is truthy
  t.truthy(statsObj);
});

// The third test case checks if the program outputs a past file with the canonical date format
test('Outputs a past file with canonical date', t => {
  // Define the file path for the past file with the canonical date format
  const filePath = path.join(
    distPath,
    'en/drafts/past-post-date-canonical/index.html'
  );

  // Use the fs.statSync function to get the statistics for the file
  const statsObj = fs.statSync(filePath);

  // Check if the file exists by checking if the stats object is truthy
  t.truthy(statsObj);
});

// The fourth test case checks if the program outputs a past file with the date format that includes a space
test('Outputs a past file with date with space', t => {
  // Define the file path for the past file with the date format that includes a space
  const filePath = path.join(
    distPath,
    'en/drafts/past-post-date-with-space/index.html'
  );

  // Use the fs.statSync function to get the statistics for the file
  const statsObj = fs.statSync(filePath);

  // Check if the file exists by checking if the stats object is truthy
  t.truthy(statsObj);
});

// The fifth test case checks if the program outputs a past file with the date format that includes a timezone
test('Outputs a past file with date with timezone', t => {
  // Define the file path for the past file with the date format that includes a timezone
  const filePath = path.join(
    distPath,
    'en/drafts/past-post-date-with-timezone/index.html'
  );

  // Use the fs.statSync function to get the statistics for the file
  const statsObj = fs.statSync(filePath);

  // Check if the file exists by checking if the stats object is truthy
  t.truthy(statsObj);
});

// If the program is running in production mode and the CI environment variable is not truthy
if (process.env.NODE_ENV === 'production' && !isTruthy(process.env.CI)) {
  // The sixth test case checks if the program does not output a draft file
  test('Does not output a draft file', t => {
    // Define the file path for the draft file
    const filePath = path.join(distPath, 'en/drafts/draft/index.html');

    // Use the fs.statSync function to get the statistics for the file
    const error = t.throws(() => fs.statSync(filePath), {instanceOf: Error});

    // Check if the file does not exist by checking if the error code is 'ENOENT'
    t.is(error.code, 'ENOENT');
  });

  // The seventh test case checks if the program does not output a future file
  test('Does not output a future file', t => {
    // Define the file path for the future file
    const filePath = path.join(distPath, 'en/drafts/future-
