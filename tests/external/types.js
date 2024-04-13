/**
 * This file contains tests for the TypeDoc / .d.ts parser.
 */

// eslint-disable-next-line ava/use-test
const {default: test} = require('ava');
const tmp = require('tmp');
const fs = require('fs');
const path = require('path');
const dtsParse = require('../../external/build/lib/dts-parse.js');

/**
 * This function takes an array of source code objects and an optional mode string,
 * and returns a Promise that resolves to the parsed types.
 * @param {{module?: string, source: string}[]} sources - An array of objects, where each
 * object contains the source code and an optional module name.
 * @param {string=} mode - An optional mode string for parsing.
 */
async function parseVirtualTypes(sources, mode) {
  // ... implementation details ...
}

test('chrome-like data', async t => {
  const source = `
  // ... chrome-like data ...
  `;

  // ... test implementation details ...

  const fooNamespace = types['purelyForTest']?._type?.properties[0];
  const helloProperty = fooNamespace?._type?.properties[0];

  // ... assertions for the chrome-like data ...
});

test('early optional method', async t => {
  const source = `
  // ... early optional method ...
  `;

  // ... test implementation details ...

  const fooMethod = types['purelyForTest']?._type.properties[0];

  // ... assertions for the early optional method ...
});

test('workbox-like data', async t => {
  const source1 = `
  // ... workbox-like data for Router ...
  `;

  const source2 = `
  // ... workbox-like data for DoThing ...
  `;

  const sources = [
    // ... array of sources and modules ...
  ];

  // ... test implementation details ...

  const outputKeys = Object.keys(types);

  // ... assertions for the workbox-like data ...
});
