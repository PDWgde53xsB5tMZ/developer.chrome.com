/**
 * @fileoverview Fetches and preprocesses types from Workbox.
 */

// Import required modules
const dtsParse = require('./lib/dts-parse.js');
const tmp = require('tmp');
const fs = require('fs');
const mvdir = require('mvdir');
const path = require('path');
const childProcess = require('child_process');

// Array of Workbox packages to fetch
const workboxPackages = [
  'workbox-background-sync',
  'workbox-broadcast-update',
  'workbox-build',
  'workbox-cacheable-response',
  'workbox-core',
  'workbox-expiration',
  'workbox-google-analytics',
  'workbox-navigation-preload',
  'workbox-precaching',
  'workbox-range-requests',
  'workbox-recipes',
  'workbox-routing',
  'workbox-strategies',
  'workbox-streams',
  'workbox-webpack-plugin',
  'workbox-window',
];

/**
 * @param {string[]} packages
 * @param {string} targetDir
 */
async function fetchAndPrepare(packages, targetDir) {
  /** @type {childProcess.ExecFileSyncOptions} */
  const options = {cwd: targetDir, stdio: 'inherit'};

  // Initialize a new npm project and install the given packages
  childProcess.execFileSync('npm', ['init', '--yes'], options);
  childProcess.execFileSync('npm', ['install', ...packages], options);

  // Get the version of each package and log it
  const versionData = Object.fromEntries(
    packages.map(name => {
      const p = path.join(targetDir, 'node_modules', name, 'package.json');

      /** @type {{version: string}} */
      const packageJson = JSON.parse(fs.readFileSync(p, 'utf-8'));
      return [name, packageJson.version];
    })
  );
  console.warn('fetched', versionData);
}

async function run() {
  // Create a temporary directory and install the packages there
  const t = tmp.dirSync();
  try {
    // webpack is a peerDependency of workbox-webpack-plugin, and needs to be
    // manually installed.
    childProcess.execFileSync('npm', ['install', 'webpack@5.75.0'], {
      cwd: t.name,
      stdio: 'inherit',
    });
    await fetchAndPrepare(workboxPackages, t.name);

    // Initialize an array to store the source files
    const sources = [];
    for (const packageName of workboxPackages) {
      const packagePath = path.join(t.name, 'node_modules', packageName);
      const packageJsonPath = path.join(packagePath, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      const typesPathParsed = path.parse(packageJson.types || 'index.d.ts');

      // If the types file is not at the top level, move it there
      const isNotTopLevel = !!typesPathParsed.dir;
      if (isNotTopLevel) {
        const typesOutputPath = path.join(packagePath, typesPathParsed.dir);
        await mvdir(typesOutputPath, packagePath, {overwrite: true});
      }

      // Add the source file to the array
      sources.push(path.join(packagePath, 'index.d.ts'));
    }

    // Parse the source files and generate the definitions
    const defs = await dtsParse({sources, mode: 'workbox'});
    // Write the definitions to a JSON file
    const outputFile = path.join(__dirname, '../data/workbox-types.json');
    fs.writeFileSync(outputFile, JSON.stringify(defs, undefined, 2));
  } finally {
    // Clean up the temporary directory
    fs.rmSync(t.name, {recursive: true});
  }
}

run();
