/**
 * @fileoverview Fetch the RSS feeds of external authors and save the data to a JSON file.
 */

// Importing required modules
const fs = require('fs'); // File system module to read and write files
const path = require('path'); // Provides utilities for working with file and directory paths
const {rssFeeds} = require('webdev-infra/utils/rss-feeds'); // A custom module to fetch RSS feeds

/**
 * The main function to fetch the RSS feeds and save the data to a JSON file.
 */
async function run() {
  // Reading the authorsData.json file
  const raw = fs.readFileSync('./site/_data/authorsData.json', 'utf8');
  
  // Parsing the JSON data
  const authorsData = JSON.parse(raw);

  // Initializing an empty object to store the feeds
  const feeds = {};

  // Iterating through the authorsData object
  for (const author in authorsData) {
    // Checking if the author has external feeds
    if (authorsData[author].external) {
      // Adding the external feeds to the feeds object
      feeds[author] = authorsData[author].external;
    }
  }

  // Fetching the RSS feeds using the rssFeeds function
  const authorsFeeds = await rssFeeds(feeds);

  // Writing the fetched feeds data to a JSON file
  fs.writeFileSync(
    path.join(__dirname, '../data/external-posts.json'),
    JSON.stringify(authorsFeeds)
  );
}

// Calling the run function to execute the script
run();

