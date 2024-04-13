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
 * @fileoverview This file determines the environment the app was started in 
 * and returns either the Google Cloud Storage handler (for staging) 
 * or the local filesystem handler in all other cases.
 *
 * It exports a single function, `buildStaticHandler`, which returns an appropriate 
 * handler based on the environment.
 */

const {buildFileSystemHandler} = require('./fileSystem');
const {bucketHandler} = require('./bucket');

/**
 * Builds and returns the appropriate static handler based on the environment.
 *
 * If the environment variable `GOOGLE_CLOUD_PROJECT` is set to 'dcc-staging', 
 * the Google Cloud Storage handler (`bucketHandler`) is returned. Otherwise, 
 * the local filesystem handler (`buildFileSystemHandler()`) is returned.
 *
 * @function buildStaticHandler
 * @returns {Function} A handler function that provides file handling 
 * based on the environment.
 */
function buildStaticHandler() {
  // Determine the environment based on the 'GOOGLE_CLOUD_PROJECT' environment variable
  if (process.env.GOOGLE_CLOUD_PROJECT === 'dcc-staging') {
    // Return the Google Cloud Storage handler for the staging environment
    return bucketHandler;
  }

  // In all other cases, return the local filesystem handler
  return buildFileSystemHandler();
}

//
