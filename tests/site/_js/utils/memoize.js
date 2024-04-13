// Importing the 'ava' testing library and the 'memoize' utility function.
const test = require('ava');
const memoize = require('../../../../site/_js/utils/memoize');

// The first test case checks if the memoize function returns the expected value.
test('memoize: test memoize returns expected', t => {
  // Creating a memoized function using memoize.
  const memoized = memoize(() => 1234);

  // Asserting that the memoized function returns the expected value (1234).
  t.assert(memoized() === 1234);
});

// The second test case checks if the memoize function caches the result and does not call the function multiple times.
test('memoize: test memoize caches result and does not call multiple times', t => {
  let initial = 10;

  // Creating a memoized function that increments the 'initial' variable by 20 each time it is called.
  const memoized = memoize(() => {
    initial += 20;

    return initial;
  });

  // Asserting that the memoized function returns the expected value (30) and that the 'initial' variable has the correct value.
  t.assert(memoized() === 30);
  t.assert(memoized() === 30);
  t.assert(memoized() === 30);
  t.assert(initial === 30);
});

// The third test case checks if the memoize function caches the result once per function signature.
test('memoize: test memoize caches once per function signature', t => {
  let initial = 10;

  // Creating a memoized function that takes an argument 'add' and increments the 'initial' variable by 'add' each time it is called.
  const memoized = memoize((add) => {
    initial += add;
    return initial;
  });

  // Asserting that the memoized function returns the expected values for different arguments.
  t.assert(memoized(
