const {dirname} = require('path'); // Import the dirname function from the path module
const {mkdirSync, writeFileSync} = require('fs'); // Import the mkdirSync and writeFileSync functions from the fs module
const sassProcessor = require('sass'); // Import the sassProcessor module

// Define an array of entrypoints, each with a source and destination path for CSS files
const entrypoints = [
  {
    src: './site/_scss/layouts/main.scss',
    dest: './dist/css/main.css',
  },
  // ...
];

// Flag to indicate whether the code is running in production mode
const isProduction = process.env.NODE_ENV === 'production';

// Define an asynchronous function that processes the Sass files
const sass = async () => {
  // Loop through each entrypoint
  entrypoints.forEach(entrypoint => {
    // Render the Sass file and generate a source map if not in production mode
    const result = sassProcessor.renderSync({
      file: entrypoint.src,
      outFile: entrypoint.dest,
      sourceMap: !isProduction,
    });

    // Create the destination directory if it does not exist
    mkdirSync(dirname(entrypoint.dest), {recursive: true});

    // Write the CSS output to the destination file
    writeFileSync(entrypoint.dest, result.css.toString(), 'utf8');

    // If not in production mode, write the source map to a separate file
    if (!isProduction) {
      writeFileSync(entrypoint.dest + '.map', result.map.toString(), 'utf8');
    }
  });
};

// Export the sass function as a module
module.exports = sass;
