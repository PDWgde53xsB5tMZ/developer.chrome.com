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
 * @fileoverview Posts a comment to the PR, that the deployment has started.
 */

// Import required modules
const {isGoogleCloudBuild} = require('./lib/isGoogleCloudBuild');
const {getDeploymentType} = require('./lib/getDeploymentType');
const {updateStickyComment} = require('./lib/updateStickyComment');

/**
 * buildStaticSite - Builds the static site using Google Cloud Build.
 *
 * This function checks if the code is running in Google Cloud Build and gets the PR number, commit SHA, and deployment type.
 * It then builds the static site using the 'npm run production' command and updates the sticky comment in the PR with the build status.
 * If the build fails, the function throws an error and updates the sticky comment with the error message.
 *
 * @returns {Promise} A promise that resolves when the build is complete.
 */
async function buildStaticSite() {
  // Check if the code is running in Google Cloud Build
  isGoogleCloudBuild();

  // Get the PR number and commit SHA from the environment variables
  const prNumber = process.env.PR_NUMBER;
  const commitSha = process.env.COMMIT_SHA;

  // Get the deployment type
  const deploymentType = await getDeploymentType();
  if (!deploymentType) {
    // If no deployment type is found, exit the function
    return;
  }

  // Import the 'execa' module to execute the 'npm run production' command
  const {execaCommand} = await import('execa');

  try {
    // Execute the 'npm run production' command
    const build = execaCommand('npm run production');

    // Pipe the error output to the standard error stream
    build.stderr.pipe(process.stderr);

    // Pipe the standard output to the standard output stream
    build.stdout.pipe(process.stdout);

    // Wait for the build to complete
    await build;
  } catch (e) {
    // If the build fails, update the sticky comment with the error message
    await updateStickyComment(
      prNumber,
      `:x: Failed to build (${deploymentType}) the site for commit ${commitSha}. ` +
        'Building the site (`npm run production`) failed with the following error output:' +
        '\n\n' +
        '```\n' +
        e.stderr +
        '\n```\n' +
        'Check the `Stage (dcc-staging)` check status for more details.'
    );

    // Throw the error to fail the entire job
    throw e;

