// Importing the 'ava' testing library to test the 'truncate-string' utility function
const test = require('ava');

// Importing the 'truncate-string' utility function from '../../../../site/_js/utils/truncate-string'
const truncateString = require('../../../../site/_js/utils/truncate-string');

// Test case to check if 'truncate-string' does not break words when truncating
test('truncate-string does not break words', t => {
  // Asserting that truncating 'Lorem Ipsum is simply dummy text' to 17 characters returns 'Lorem Ipsum is'
  t.assert(
    truncateString('Lorem Ipsum is simply dummy text', 17) === 'Lorem Ipsum is'
  );
});

// Test case to check if 'truncate-string' can trim to the first word
test('truncate-string can trim to the first word', t => {
  // Asserting that truncating 'Lorem Ipsum is simply dummy text' to 4 characters returns 'Lorem'
  t.assert(truncateString('Lorem Ipsum is simply dummy text', 4) === 'Lorem');
});

// Test case to check if 'truncate-string' can trim to the last word
test('truncate-string can trim to the last word', t => {
  // Asserting that truncating 'Lorem Ipsum is simply dummy text' to 32 characters returns 'Lorem Ipsum is simply dummy text'
  t.assert(
    truncateString('Lorem Ipsum is simply dummy text', 32) ===
      'Lorem Ipsum is simply dummy text'
  );
});

// Test case to check if 'truncate-string' can handle empty strings
test('truncate-string can handle empty strings', t => {
  // Asserting that truncating an empty string to any length returns an empty string
  t.assert(truncateString('', 12) === '');
});

// Test case to check if 'trunc
