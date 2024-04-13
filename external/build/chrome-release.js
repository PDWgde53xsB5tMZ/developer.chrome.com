/**
 * @fileoverview This file is responsible for fetching Chrome release data and storing it in a local JSON file.
 */

// Importing the required modules
const buildVersionInformation = require('./lib/chrome-release.js'); // For fetching Chrome release data
const fs = require('fs'); // For interacting with the file system
const path = require('path'); // For handling file paths

/**
 * Async function run()
 * 
 * @description - The main function that fetches Chrome release data and writes it to a local JSON file.
 */
async function run() {
  // Fetching Chrome release data
  const versionInformation = await buildVersionInformation();

  // Defining the target file path to store the Chrome release data
  const targetFile = path.join(__dirname, '../data/chrome-release.json');

  // Writing the fetched data to the target file in JSON format
  fs.writeFileSync(targetFile, JSON.stringify(versionInformation));
}

// Calling the run() function to execute the main functionality
run();
