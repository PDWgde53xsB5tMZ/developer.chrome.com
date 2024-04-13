/*
 * Copyright 2022 Google LLC
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
 * @fileoverview Gets a list of changed files by looking at the currently
 * checked out commit in Google Cloud Build and either outputs 'static'
 * or 'app', depending on the defined globs which are matched against
 * the list of changed files.
 */

// Import required libraries
const micromatch = require('micromatch');
const fs = require('fs/promises');
const path = require('path');

// Import custom libraries
const {requestGitHubApi} = require('./lib/gitHubApi');
const {isGoogleCloudBuild} = require('./lib/isGoogleCloudBuild');

// Define glob patterns for app and static files
const APP_GLOB = ['package.json', 'server/**/*.js'];
const STATIC_GLOB = ['site/**/*'];

// Define output paths for app and static builds
const OUTPUT_APP_BUILD = 'app';
const OUTPUT_STATIC_BUILD = 'static';

// Define the path to the file where the deployment type will be written
const DEPLOYMENT_TYPE_PATH = path.join(__dirname, 'tmp', 'deploymentType.txt');

// Define the function to determine the deployment type
async function determineDeploymentType() {
  // Check if the code is running in Google Cloud Build
  isGoogleCloudBuild();

  // Get the pull request number from the environment variables
  const prNumber = process.env.PR_NUMBER;

  // Get the list of changed files from the GitHub API
  let {data: changedFiles} = await requestGitHubApi(
    'GET',
    `pulls/${prNumber}/files?per_page=100`
  );
  changedFiles = changedFiles.map(file => {
    return file.filename;
  });

  // Check if any of the changed files match the app or static glob patterns
  let output = '';
  if (micromatch(changedFiles, APP_GLOB).length) {
    output = OUTPUT_APP_BUILD;
  } else if (micromatch(changedFiles, STATIC_GLOB).length) {
    output = OUTPUT_STATIC_BUILD;
  }

  // Write the deployment type to a file, as Google Cloud Build does not support
  // passing data between build steps using any other method.
  await fs.writeFile(DEPLOYMENT_TYPE_PATH, output, {encoding: 'utf-8'});
  console.log(`Wrote deployment type (${output}) to`, DEPLOYMENT_TYPE_PATH);
}

// Export the determineDeploymentType function and the DEPLOYMENT_TYPE_PATH
// constant for use in other modules
module.exports = {
  determineDeploymentType,
  DEPLOYMENT_TYPE_PATH,
};
