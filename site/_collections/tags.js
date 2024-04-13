// Copyright and license information

const {locales} = require('../_data/site.json');
const {filterOutDrafts} = require('../_utils/drafts');
const YAML = require('js-yaml');
const path = require('path');
const fs = require('fs');

// The 'example' tag is excluded from processing
const EXAMPLE_TAG_ID = 'example';

/**
 * The main function that processes the blog post data and organizes it by tags.
 *
 * @param {EleventyCollectionObject} collections - The Eleventy collection object
 * @return {Tags} - An object containing the processed tags and related data
 */
module.exports = function (collections) {
  // Initialize an empty 'tags' object
  const tags = {};

  // Get all sorted blog posts, reverse the order, and filter out drafts
  const allSorted = collections
    .getAllSorted()
    .reverse()
    .filter(filterOutDrafts);

  // Load the supported tags from a YAML file
  const supportedTags = YAML.load(
    fs.readFileSync(path.join(__dirname, '../_data/i18n/tags.yml'), 'utf-8')
  );

  // Iterate through all sorted blog posts
  for (const item of allSorted) {
    // If there are no tags or the tags aren't in the correct format, skip the post
    let allTags = [item.data.tags ?? []].flat();
    if (!allTags.length) {
      delete item.data.tags;
      continue;
    }

    // Normalize 'chromeX' tags to 'chrome-X' format
    allTags = allTags.map(tag => {
      const chromeXRegex = /^chrome(\d+)$/;
      chromeXRegex.lastIndex = 0;
      const match = tag.match(chromeXRegex);
      if (match) {
        return `chrome-${match[1]}`;
      }

      return tag;
    });

    // Ensure that 'tags' data is in the correct format
    item.data.tags = allTags;

    // Process 'chrome-X' tags and supported tags separately
    for (const chromeTag of allTags.filter(tag => tag.startsWith('chrome-'))) {
      // Create a sub-object for the 'chrome-X' tag if it doesn't exist
      if (!tags[chromeTag]) {
        tags[chromeTag] = {
          key: chromeTag,
          posts: locales.reduce((o, key) => ({...o, [key]: []}), {}),
          title: 'i18n.tags.chrome',
          overrideTitle: chromeTag.replace('chrome-', 'Chrome '),
          release: +chromeTag.substr('chrome-'.length),
          url: `/tags/${chromeTag}/`,
        };
      }
      tags[chromeTag].posts[item.data.locale].push(item);
    }

    for (const postsTag of allTags) {
      // If a tag isn't supported or is the 'example' tag, skip it
      if (!(postsTag in supportedTags) || postsTag === EXAMPLE_TAG_ID) {
        continue;
      }

      // Create a sub-object for the supported tag if it doesn't exist
      if (!tags[postsTag]) {
        tags[postsTag] = {
          key: postsTag,
          posts: locales.reduce((o, key) => ({...o, [key]: []}), {}),
          title: 'i18n.tags.' + postsTag,
          url: `/tags/${postsTag}/`,
        };
      }
      tags[postsTag].posts[item.data.locale].push(item);
    }
  }

  return tags;
};
