const {isPublished} = require('./_utils/drafts');
const {isTruthy} = require('./_utils/isTruthy');

// Regular expression to match the project key in the URL.
// Matches e.g. "/es/docs/blah/" or "/en/docs/foo-bar_zing/".
const projectKeyRe = /\/\w{2,}\/docs\/([_-\w]+)\//;

module.exports = {
  // The 'permalink' function adds support for drafts.
  // If a page has 'draft: true' in its YAML frontmatter
  // or is scheduled for future, then this snippet will
  // set its permalink to false and the page will not be output
  // in production builds. For preview builds this behaviour is
  // overriden by setting the 'CI' variable to true
  //
  // For dev builds we will render the page with a warning that it's a draft.
  eleventyComputed: {
    permalink: data => {
      if (process.env.NODE_ENV !== 'production' || isTruthy(process.env.CI)) {
        // If the current environment is not production or CI is true,
        // return the original permalink.
        return data.permalink;
      } else {
        // If the current environment is production and CI is false,
        // check if the page is published. If it is, return the original
        // permalink; otherwise, set the permalink to false.
        return isPublished(data) ? data.permalink : false;
      }
    },
    eleventyExcludeFromCollections: data => {
      if (process.env.NODE_ENV !== 'production' || isTruthy(process.env.CI)) {
        // If the current environment is not production or CI is true,
        // include the page in collections.
        return data.permalink;
      } else {
        // If the current environment is production and CI is false,
        // check if the page is published. If it is, include the page
        // in collections; otherwise, exclude the page from collections.
        return isPublished(data) ? data.permalink : false;
      }
    },
    // The 'project_key' function sets a 'project_key' property for some pages.
    project_key: data => {
      if (data.project_key) {
        //
