// Import the 'config' object from the 'dotenv' package.
import { config } from 'dotenv';

// Call the 'config' function to load the environment variables from the .env file.
config();

// Check if the 'DEVTOOLS\_VERSION' environment variable is set.
// If it's not set, throw an error message asking the user to add it to the .env file.
if (!process.env.DEVTOOLS\_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS\_VERSION="xxx".';
}

// Import the 'createWndtBanners' function and the 'locales' array from the 'utils.mjs' module.
import { createWndtBanners, locales } from './utils.mjs';

// Extract the list of languages from the 'locales' array.
const languages = locales.map(x => x.lang);

// Call the async function that creates the banners and logs a message to the console.
(async () => {
  // Ignore the TypeScript error for the 'process.env.DEVTOOLS\_VERSION' argument.
  // This is necessary because the 'createWndtBanners' function expects a string argument,
  // but the TypeScript compiler is not able to infer the type of 'process.env.DEVTOOLS\_VERSION'.
  // @ts-ignore
  await createWndtBanners(process.env.DEVTOOLS\_VERSION, languages);

  // Log a message to the console with instructions for uploading the images and extracting them.
  console.log(
    'Upload the images then use the snippet in "_temp/new-in-devtools-image-snippet.md" to extract them.'
  );
})();

