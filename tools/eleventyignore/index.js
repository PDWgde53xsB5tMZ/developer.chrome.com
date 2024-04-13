/**
 * This script generates an .eleventyignore file for an Eleventy project.
 * The .eleventyignore file tells Eleventy to ignore certain files and directories
 * during the build process, which can speed up build times.
 */


// Define an array of files and directories to ignore during the build process.
let ignores = [
  'node_modules',
  '**/README.md',
  '**/_example',
  '**/preview/layouts',
  '*.swp',
];


// Determine whether the current build is in production mode or CI mode.
const isProduction = process.env.NODE_ENV === 'production';
const isCI = process.env.CI;


// Define a helper function to determine whether a value is truthy.
const isTruthy = value => {
  if (value === '0' || value === 'false') return false;
  return !!value;
};


// Modify the array of files and directories to ignore based on various environment variables.
// These variables allow the user to specify which sections of their documentation they want to ignore.
if (!isProduction || isCI) {
  // ...
}


// Write the completed .eleventyignore file to the root of the project.
fs.writeFileSync('.eleventyignore', ignores.join('\n'));


// This script generates an .eleventyignore file for an Eleventy project,
// allowing the user to specify which files and directories should be ignored
// during the build process.
