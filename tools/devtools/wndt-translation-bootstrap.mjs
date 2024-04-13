// Import required modules
import {config} from 'dotenv'; // Load environment variables from .env file
import {createInterface} from 'readline'; // Create readline interface for user input

config(); // Load .env file

// Throw error if required environment variables are not set
if (!process.env.DEVTOOLS_VERSION) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_VERSION="xxx".';
}

if (!process.env.DEVTOOLS_TRANSLATE_DUE) {
  throw 'Please make sure have a .env file with parameter DEVTOOLS_TRANSLATE_DUE="MMM-DD".';
}

if (!process.env.GITHUB_TOKEN) {
  throw 'Please make sure have a .env file with parameter GITHUB_TOKEN="your-token". 
  Follow the instruction here to generate: <https://github.com/settings/tokens/new?scopes=repo>';
}

// Import utility functions
import {
  createWndtBlogPosts,
  createGitHubIssues,
  populateTranslationContent,
  locales,
} from './utils.mjs';

// Filter languages excluding the default one
const languages = locales.filter(x => !x.isDefault).map(x => x.lang);

// Initialize translators and images objects with environment variables
const translators = {};
languages.forEach(
  lang =>
    (translators[lang] =
      process.env['DEVTOOLS_TRANSLATOR_' + lang.toUpperCase()] || '')
);

const images = {};
languages.forEach(
  lang =>
    (images[lang] = process.env['DEVTOOLS_IMAGE_' + lang.toUpperCase()] || '')
);

(async () => {
  // Call createWndtBlogPosts utility function to create Windmill blog posts
  // @ts-ignore: TypeScript ignore comment, as the function is defined in utils.mjs
  await createWndtBlogPosts(process.env.DEVTOOLS_VERSION, languages, images);

  // Call populateTranslationContent utility function to populate translation content
  // @ts-ignore: TypeScript ignore comment, as the function is defined in utils.mjs
  await populateTranslationContent(process.env.DEVTOOLS_VERSION, languages);

  // Create readline interface for user input
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Ask the user if they want to generate GitHub issues
  readline.question(
    `Do you want to generate GitHub issues for WNDT ${process.env.DEVTOOLS_VERSION} ? Y/[n]: `,
    async answer => {
      const ans = answer;

      // Generate GitHub issues based on user input
      if (ans === 'Y' || ans === 'YES') {
        // @ts-ignore: TypeScript ignore comment, as the function is defined in utils.mjs
        await createGitHubIssues(
          // @ts-ignore: TypeScript ignore comment, as the function is defined in utils.mjs
          process.env.DEVTOOLS_VERSION,
          process.env.DEVTOOLS_TRANSLATE
