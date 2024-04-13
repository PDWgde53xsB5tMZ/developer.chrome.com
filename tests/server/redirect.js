/**
 * Tests for the redirect-handler used by the server.
 */

const test = require('ava'); // Importing the test framework 'ava' for running tests.
const {
  buildCheckHandlerInternal,
} = require('../../server/handlers/redirects/redirect'); // Importing the buildCheckHandlerInternal function from the redirect handler module.
const YAML = require('js-yaml'); // Importing the YAML parser 'js-yaml' for parsing YAML configuration.

// Shared YAML source for testing redirects.
const sharedYamlSource = `
redirects:
...
`;

// Parsing the YAML source and extracting the redirects.
const {redirects} = YAML.load(sharedYamlSource);

// Test block for checking file handling.
test('handles checking files', t => {
  // Creating the check handler with the redirects and a fake directory.
  const h = buildCheckHandlerInternal(redirects, [
    __dirname, // pretend to serve this directory
  ]);

  // Testing the check handler with various file paths.
  t.is(h('/check_file_test'), '/redirect.js');
  t.is(h('/check_folder_test/redirect.js'), '/redirect.js');
  t.is(h('/check_folder_test/does_not_exist.js'), '/giveup.js');
});

// Test block for handling simple redirects.
test('handles simple redirects', t => {
  // Creating the check handler with the redirects.
  const h = buildCheckHandlerInternal(redirects);

  // Testing the check handler with various URLs.
  t.is(h('/subscribe'), '/newsletter');
  t.is(
    h('/subscribe/index.html'),
    '/newsletter/index.html',
    'trailing index.html is retained'
  );
  t.is(h('/subscribe/other.html'), null, 'unhandled URL returns null');
});

// Test block for handling group redirects.
test('handles group redirects', t => {
  // Creating the check handler with the redirects.
  const h = buildCheckHandlerInternal(redirects);

  // Testing the check handler with various group redirect URLs.
  t.is(h('/subscribe/all/foo'), '/newsletter', 'group => non-group redirect');
  t.is(
    h('/foo/x'),
    '/bar/x',
    'group redirect functions, trailing slash unchanged'
  );
  t.is(h('/foo/x/index.html'), '/bar/x/index.html', 'index.html is retained');
  t.is(
    h('/external/hello'),
    'https://google.com/hello',
    'external redirect is also unchanged'
  );
  t.is(h('/external/'), 'https://google.com/');
  t.is(h('/external'), 'https://google.com/', 'matches without trailing slash');
});

// Test block for handling query strings.
test('includes query strings', t => {
  // Creating the check handler with the redirects.
  const h = buildCheckHandlerInternal(redirects);

  // Testing the check handler with various URLs containing query strings.
  t.is(h('/subscribe/?foo'), '/newsletter/?foo');
  t.is(h('/subscribe/?foo=1&foo=2'), '/newsletter/?foo=1&foo=2');
});
