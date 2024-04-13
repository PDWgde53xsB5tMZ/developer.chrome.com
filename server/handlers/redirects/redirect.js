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

const {doRedirect} = require('../../env');
const redirectsYaml = require('redirects-yaml');
const YAML = require('js-yaml');
const fs = require('fs');
const path = require('path');

// Included for types only.
// eslint-disable-next-line no-unused-vars
const express = require('express');

/**
 * Builds a check handler function that checks if a given URL exists in the provided
 * static paths.
 *
 * @param {redirectsYaml.RedirectLine[]} redirects
 * @param {string[]=} staticPaths - An array of file paths to check for existence.
 * @return {function(string): boolean} - A function that checks if a given URL exists
 * in the provided static paths.
 */
function buildCheckHandlerInternal(redirects, staticPaths = undefined) {
  // If static paths are provided, map them to an array with non-empty elements.
  const alwaysStaticPaths = staticPaths.map(staticPath => staticPath || '.');

  // The checker function checks if a given URL exists in the provided static paths.
  const checker = s => {
    for (const staticPath of alwaysStaticPaths) {
      const check = path.join(staticPath, s);
      if (fs.existsSync(check)) {
        return true;
      }
    }
    return false;
  };

  // Build handlers for the redirects using the checker function.
  return redirectsYaml.buildHandlers(redirects, checker);
}

/**
 * Builds HTTP middleware that serves redirects for a given redirects.yaml
 * configuration file.
 *
 * @param {string} filename - The file path to the configuration file.
 * @param {string[]=} staticPaths - An array of file paths to check for existence.
 * @param {number=} code - The HTTP status code to use for the redirects.
 * @return {function(request, response, next)} - The HTTP middleware function.
 */
function buildRedirectHandler(filename, staticPaths = undefined, code = 301) {
  // Load the configuration file and extract the redirects.
  const raw = YAML.load(fs.readFileSync(filename, 'utf-8'));
  const {redirects} =
    /** @type {{ redirects: redirectsYaml.RedirectLine[] }} */ (raw);

  // Build the check handler function using the extracted redirects.
  const handler = buildCheckHandlerInternal(redirects, staticPaths);

  // The middleware function that serves the redirects.
  return (req, res, next) => {
    // Get the target URL from the check handler function.
    const target = handler(req.url);
    if (target !== null && target !== req.url) {
      // If a target URL is found, redirect to it.
      return doRedirect(res, target, code);
    }

    // If no target URL is found, check if the URL contains a dot and replace it with an
    // underscore to handle bad links with "." instead of "_".
    if (req.url.includes('.')) {
      let update = req.url.replace(/\./g, '_');
      if (update.endsWith('_html')) {
        update = update.slice(0, -5) + '.html';
      }
      const target = handler(update);
      if (target !== null && target !== req.url) {
        // If a target URL is found, redirect to it.
        return doRedirect(res, target, code);
      }
    }

    // If no target URL is found, continue to the next middleware function.
    return next();
  };
}

module.exports = {
  buildCheckHandlerInternal,
  buildRedirectHandler,
};
