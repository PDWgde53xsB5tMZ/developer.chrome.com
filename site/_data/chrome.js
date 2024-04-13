/*
 * Copyright 2020 Google LLC
 *
 * This file is licensed under the Apache License, Version 2.0 (the "License");
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

// Importing the 'fs' module for file system operations and the 'path' module
// for handling file paths.
const fs = require('fs');
const path = require('path');

/**
 * This module exports an asynchronous function that generates Chrome
 * version information.
 */
module.exports = async function buildVersionInformation() {
  // The path to the JSON file containing Chrome release data.
  const chromeReleaseDataFile = path.join(
    __dirname,
    '../../external/data/chrome-release.json'
  );

  // Reading the JSON file and parsing it into a JavaScript object.
  const data = /** @type {{channels: Object<string, ChromeReleaseData>}} */ (
    JSON.parse(fs.readFileSync(chromeReleaseDataFile, 'utf-8'))
  );

  // Iterating over each channel in the 'channels' object of the data.
  for (const channel in data.channels) {
    const channelData = data.channels[channel];

    // Reconstructing the 'stableDate' property as a JavaScript Date object,
    // as JSON encoding flattens this to a string.
    channelData.stableDate = new Date(channelData.stableDate);
  }

  // Returning the data object after updating the 'stableDate' properties.
  return data;
};

