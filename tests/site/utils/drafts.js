/*
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Importing the test function from Ava for running tests
const test = require('ava');

// Importing the utility functions isScheduledForFuture and isPublished
const {
  isScheduledForFuture,
  isPublished,
} = require('../../../site/_utils/drafts');

// Test to check if isScheduledForFuture throws an error when the 'now' argument is not a Date object
test('isScheduledForFuture throws if now is not a date', t => {
  // Defining the post object with a date and data properties
  const post = {date: new Date(), data: {}};

  // Using t.throws to expect an error when calling isScheduledForFuture with post.date and 'now'
  const error = t.throws(
    () => {
      isScheduledForFuture(post.date, 'now');
    },
    {instanceOf: Error}
  );

  // Checking if the error message is as expected
  t.is(error.message, 'argument <now> must be a Date object.');
});

// Test to check if isScheduledForFuture returns false when the post date is earlier than 'now'
test('isScheduledForFuture returns false if date is earlier than now', t => {
  // Defining the 'now' and 'tomorrow' Date objects
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);

  // Defining the post object with date and data properties
  const post = {date: now, data: {}};

  // Calling isScheduledForFuture with post.date and 'now'
  const actual = isScheduledForFuture(post.date, now);

  // Checking if the returned value is as expected
  t.false(actual);
});

// Test to check if isScheduledForFuture returns true when the post date is later than 'now'
test('isScheduledForFuture returns true if date is later than now', t => {
  // Defining the 'now' and 'tomorrow' Date objects
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);

  // Defining the post object with date and data properties
  const post = {date: tomorrow, data: {}};

  // Calling isScheduledForFuture with post.date and 'now'
  const actual = isScheduledForFuture(post.date, now);

  // Checking if the returned value is as expected
  t.true(actual);
});

// Test to check if isScheduledForFuture returns true when the post time is later than 'now'
test('isScheduledForFuture returns true if time is later than now', t => {
  // Defining the 'now' and 'inOneMinute' Date objects
  const now = new Date();
  const inOneMinute = new Date();
  inOneMinute.setMinutes(now.getMinutes() + 1);

  // Defining the post object with date and data properties
  const post = {date: inOneMinute, data: {
