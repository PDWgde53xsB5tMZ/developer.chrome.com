// Importing the 'ava' testing library and the 'domTransformer' module.
const test = require('ava');
const domTransformer = require('../../../site/_transforms/dom-transformer');

// The first test case checks if the 'domTransformer' ignores the content when there is no outputPath.
test("ignores content if there's no outputPath", async t => {
  // Defining the content string and the expected output string.
  const content = '<a href="/en/foo"></a>';
  const expected = '<a href="/en/foo"></a>';

  // Testing the 'domTransformer' with different falsy values for outputPath.
  let outputPath = false;
  let actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = undefined;
  actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = '';
  actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);
});

// The second test case checks if the 'domTransformer' ignores the content when the locale is invalid.
test('ignores content if the locale is invalid', async t => {
  // Defining the content string and the expected output string.
  const content = '<a href="/en/foo"></a>';
  const expected = '<a href="/en/foo"></a>';

  // Testing the 'domTransformer' with different invalid outputPath values.
  let outputPath = '/xx/foo.html';
  let actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);

  outputPath = '/feed.xml';
  actual = await domTransformer(content, outputPath);
  t.assert(actual === expected);
});

