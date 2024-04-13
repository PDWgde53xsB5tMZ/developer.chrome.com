// Import required modules: 'ava' for testing, 'path' for file path manipulation, and custom modules
// 'BreadcrumbBuilder' and 'buildAllBreadcrumbs' for building breadcrumbs.
const test = require('ava');
const path = require('path');
const { BreadcrumbBuilder, buildAllBreadcrumbs } = require('../../../../site/_data/lib/breadcrumbs');

/**
 * A function that returns a virtual EleventyCollectionItem with the given title and project_key.
 * @return {EleventyCollectionItem}
 */
function virtualItem(title, project_key) {
  return {
    data: {
      title,
      project_key,
    },
  };
}

/**
 * A function that builds breadcrumbs based on the provided lookup function, URL, and index.
 * @param {(path: string) => EleventyCollectionItem|undefined} callback
 * @param {string} url
 * @param {AllProjectIndex} index
 */
function run(callback, url, index) {
  // Initialize a new BreadcrumbBuilder instance with a custom URL generator that uses the
  // provided callback function to resolve URLs.
  const builder = new BreadcrumbBuilder(url => {
    url = path.join(url, '/');
    return callback(url);
  });

  // Build all breadcrumbs for the given URL using the BreadcrumbBuilder instance.
  buildAllBreadcrumbs(url, builder, index);

  // Return the built breadcrumbs for the given URL.
  return builder.build(url);
}

// Test suites for the 'run' function with different test cases.
test('i18n URLs', t => {
  const lookup = url => {
    switch (url) {
      case '/en/':
        return virtualItem('Top');
      case '/pt/blog/':
        return virtualItem('Blog');
      case '/pt/blog/article/':
        return virtualItem('Article');
    }
  };

  // The expected breadcrumbs for the given URL and lookup function.
  t.deepEqual(run(lookup, '/pt/blog/article'), [{title: 'Blog', url: '..'}]);
});

test('real URLs only', t => {
  const lookup = url => {
    switch (url) {
      case '/en/':
        return virtualItem('Top');
      case '/en/foo/':
        return virtualItem('Foo');
      case '/en/foo/bar/':
        return virtualItem('Bar');
    }
  };

  // The expected breadcrumbs for the given URL and lookup function.
  t.deepEqual(run(lookup, '/en/foo/bar'), [{title: 'Foo', url: '..'}]);
  t.deepEqual(run(lookup, '/en/foo/bar/zing'), [
    {title: 'Foo', url: '../..'},
    {title: 'Bar', url: '..'},
  ]);
});

test('always includes single breadcrumb', t => {
  const lookup = url => {
    switch (url) {
      case '/en/':
        return virtualItem('Top');
      case '/en/foo/':
        return virtualItem('Foo');
    }
  };

  // The expected breadcrumbs for the given URL and lookup function.
  t.deepEqual(run(lookup, '/en/'), []);
  t.deepEqual(run(lookup, '/en/foo'), [{title: 'Foo', url: ''}]);
  t.deepEqual(run(lookup, '/en/foo/bar'), [{title: 'Foo', url: '..'}]);
});

test('URLs with project section', t => {
  const lookup = url => {
    switch (url) {
      case '/en/':
        return virtualItem('Top');
      case '/en/docs/':
        return virtualItem('Documentation');
      case '/en/docs/extensions/':
        return virtualItem('Extensions', 'extensions');
      case '/en/docs/extensions/page/':
        return virtualItem('Random Page');
    }
  };

  // The index object used for building breadcrumbs with real URLs.
  const index = {
    extensions: {
      // This page is under two virtual sections.
      '/docs/extensions/page/': [
        {title: 'i18n.docs.extensions.overview'},
        {title: 'i18n.docs.extensions.overview'},
      ],
      // This page is under two virtual sections and one real URL that is looked up.
      '/docs/extensions/page/subpage/': [
        {title: 'i18n.docs.extensions.overview'},
        {title: 'i18n.docs.extensions.overview'},
        {url: '/docs/extensions/page/'},
      ],
    },
  };

  // The expected breadcrumbs for the given URL, lookup function, and index.
  t.deepEqual(run(lookup, '/en/docs/extensions/page/', index), [
    {title: 'Documentation', url: '../..'},
    {title: 'Extensions', url: '..'},
    {title: 'Overview'},
    {title: 'Overview'},
  ]);

  // The expected breadcrumbs for the given URL, lookup function, and index.
  t.deepEqual(run(lookup, '/en/docs/extensions/page/subpage/', index), [
    {title: 'Documentation', url: '../../..'},
    {title: 'Extensions', url: '../..'},
    {title: 'Overview'},
    {title: 'Overview'},
    {title: 'Random Page
