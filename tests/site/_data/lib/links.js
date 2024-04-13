/**
 * Requires the 'ava' testing library and the 'getLinkActiveState' function from the '/_data/lib/links' module.
 */
const test = require('ava');
const {getLinkActiveState} = require('../../../../site/_data/lib/links');

/**
 * The first test case checks if the function returns the correct string when the URLs match exactly.
 */
test('returns current and active if the urls match', t => {
  /**
   * The expected string contains the 'data-state' and 'aria-current' attributes set to 'active'.
   */
  const expected = ' data-state="active" aria-current="page"';

  /**
   * Three different exact URL matches are tested.
   */
  let itemUrl = '/';
  let pageUrl = '/';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);

  itemUrl = '/docs';
  pageUrl = '/docs';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);

  itemUrl = '/foo/bar/baz';
  pageUrl = '/foo/bar/baz';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);
});

/**
 * The second test case checks if the function returns the 'active' string when the page path is a subpath of the item.
 */
test('returns active if the page path is a subpath of the item', t => {
  /**
   * The expected string contains the 'data-state' attribute set to 'active'.
   */
  const expected = ' data-state="active"';

  /**
   * An example of a subpath is tested.
   */
  const itemUrl = '/docs';
  const pageUrl = '/docs/extensions';
  t.assert(getLinkActiveState(itemUrl, pageUrl) === expected);
});

/**
 * The third test case checks if the function returns 'undefined' when no match is found.
 */
test('returns undefined if no match is found', t => {
  /**
   * Three different cases
