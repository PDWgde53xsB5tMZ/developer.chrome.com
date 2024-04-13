// Import the 'config' object from 'dotenv' package
import { config } from 'dotenv';

// Initialize the 'config' object to load environment variables from .env file
config();

// Check if the 'DEVTOOLS_VERSION' environment variable is set
if (!process.env.DEVTOOLS_VERSION) {
  // If not, throw an error message asking the user to set the .env file parameter
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

// Check if the 'DEVTOOLS_IMAGE_EN' environment variable is set
if (!process.env.DEVTOOLS_IMAGE_EN) {
  // If not, log a warning message suggesting that the user might have forgotten to generate images
  console.warn('Did you forgot to generate images beforehand?');
}

// Import the 'createWndtBlogPosts' function and 'locales' array from './utils.mjs' file
import { createWndtBlogPosts, locales } from './utils.mjs';

// Filter the 'locales' array to get the default languages
const languages = locales.filter(x => x.isDefault).map(x => x.lang);

// Initialize an empty 'images' object
const images = {};

// Populate the 'images' object with the environment variables for each language
languages.forEach(
  lang =>
    (images[lang] = process.env['DEVTOOLS_IMAGE_' + lang.toUpperCase()] || '')
);

// Call the 'createWndtBlogPosts' function asynchronously with the required parameters
(async () => {
  // Ignore TypeScript type checking for the 'createWndtBlogPosts' function call
  // @ts-ignore
  await createWndtBlogPosts(process.env.DEVTOOLS_VERSION, languages, images);
})();

