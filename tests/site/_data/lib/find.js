const test = require('ava'); // Importing the Ava testing framework
const {findByUrl, findByFilePath} = require('../../../../site/_data/lib/find'); // Importing the findByUrl and findByFilePath functions

// Setting up the test context with a collection of test data
test.beforeEach(t => {
  t.context.collection = [
    {url: '/foo/', filePathStem: '/en/foo', title: 'Foo'}, // A test item with URL '/foo/', file path stem '/en/foo', and title 'Foo'
    {url: '/es/foo/', filePathStem: '/es/foo', title: 'Foo es'}, // A test item with URL '/es/foo/', file path stem '/es/foo', and title 'Foo es'
    {url: '/es/bar/', filePathStem: '/es/bar', title: 'Bar'}, // A test item with URL '/es/bar/', file path stem '/es/bar', and title 'Bar'
  ];
});

// Test case for finding a URL if it exists in the collection
test('finds a url if it exists in the collection', t => {
  const {collection} = t.context; // Retrieving the test collection from the context

  const itemToFind = '/foo/'; // The item to find
  const result = findByUrl(collection, itemToFind); // Finding the item in the collection
  t.assert(result.title === 'Foo'); // Asserting that the title of the found item is 'Foo'
});

// Test case for finding a URL (not absolute) if it exists in the collection
test('finds a url (not absolute) if it exists in the collection', t => {
  const {collection} = t.context; // Retrieving the test collection from the context

  const itemToFind = 'foo'; // The item to find
  const result = findByUrl(collection, itemToFind); // Finding the item in the collection
  t.assert(result.title === 'Foo'); // Asserting that the title of the found item is 'Foo'
});

// Test case for finding a URL (without a trailing slash) if it exists in the collection
test('finds a url (without a trailing slash) if it exists in the collection', t => {
  const {collection} = t.context; // Retrieving the test collection from the context

  const itemToFind = '/foo'; // The item to find
  const result = findByUrl(collection, itemToFind); // Finding the item in the collection
  t.assert(result.title === 'Foo'); // Asserting that the title of the found item is 'Foo'
});

// Test case for finding a language-specific URL if it exists
test('finds language-specific url if it exists', t => {
  const {collection} = t.context; // Retrieving the test collection from the context

  const itemToFind = '/bar'; // The item to find
  const result = findByUrl(collection, itemToFind, '/es'); // Finding the item in the collection with the specified language
  t.assert(result.title === 'Bar'); // Asserting that the title of the found item is 'Bar'
});

// Test case for finding a language-specific URL (not absolute) if it exists
test('finds language-specific url (not absolute) if it exists', t => {
  const {collection} = t.context; // Retrieving the test collection from the context

  const itemToFind = '/bar'; // The item to find
  const result = findByUrl(collection, itemToFind, 'es'); // Finding the item in the collection with the specified language
  t.assert(result.title === 'Bar'); // Asserting that the title of the found item is 'Bar'
});

// Test case for finding a path if it exists in the collection
test('finds a path if it exists in the collection', t => {
  const {collection} = t.context; // Retrieving the test collection from the context

  const result = findByFilePath(collection, '/foo'); // Finding the item in the collection with the specified file path
  t.assert(result.title === 'Foo'); // Asserting that the title of the found item is 'Foo'
});

// Test case for finding a path (not absolute) if it exists in the collection
test('finds a path (not absolute) if it exists in the collection', t => {
  const {collection} = t.context; // Retrieving the
