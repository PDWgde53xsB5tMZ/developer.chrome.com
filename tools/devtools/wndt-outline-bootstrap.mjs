// Import the 'config' object from the 'dotenv' package
import { config } from 'dotenv';

// Initialize the 'config' object to load environment variables from a .env file
config();

// Check if the 'DEVTOOLS_VERSION' environment variable is set
if (!process.env.DEVTOOLS_VERSION) {
  // If it's not set, throw an error message asking the user to create a .env file with the 'DEVTOOLS_VERSION' parameter
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

// Import the 'createWndtOutline' function and the 'locales' array from the 'utils.mjs' module
import { createWndtOutline, locales } from './utils.mjs';

// Extract the list of languages from the 'locales' array
const languages = locales.map(x => x.lang);

// Ignore TypeScript type checking for the 'createWndtOutline' function call
// @ts-ignore

// Call the 'createWndtOutline' function with the 'DEVTOOLS_VERSION' environment variable and the list of languages
createWndtOutline(process.env.DEVTOOLS_VERSION, languages);
