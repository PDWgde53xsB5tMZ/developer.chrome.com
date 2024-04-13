/*
 * Copyright 2020 Google LLC
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

/**
 * A filter function to remove draft pages from a collection. This filter
 * allows drafts to appear in a development environment but omits them
 * from collections in a production environment. This is useful for
 * keeping drafts in the development environment while excluding them
 * from production collections.
 *
 * @param {EleventyCollectionItem} item - An item from the collection.
 * @return {boolean} - True if the item should be included in the collection,
 *                     false if it should be excluded (i.e., if it is a draft
 *                     page in a production environment).
 */
const filterOutDrafts = item => {
  if (process.env.NODE_ENV === 'production') {
    return !item.data.draft;
  }
  return true; // include everything in non-production environments
};

/**
 * Checks if the provided date is later than the current date and time.
 * This function is useful for determining if a post is scheduled for
 * future publication.
 *
 * @param {Date=} postDate - The date to be compared. If not provided, the
 *                           current date and time is used.
 * @param {Date?} now - Used to override the current date and time, e.g., in tests.
 * @return {boolean} - True if the date is in the future, false otherwise.
 */
function isScheduledForFuture(postDate, now = new Date()) {
  if (!(now instanceof Date)) {
    throw new Error('argument <now> must be a Date object.');
  }
  postDate = postDate ? new Date(postDate) : new Date();
  return postDate.getTime() > now.getTime();
}

/**
 * Checks if the post is in a publishable state, meaning it is not a draft
 * and is not scheduled for future publication.
 *
 * @param {EleventyData} data - The 11ty data available for a given post.
 * @return {boolean} - True if the post is publishable, false otherwise.
 */
function isPublished(data) {
  return !(data.draft || isScheduledForFuture(data.page?.date));
}

module.exports = {filterOutDrafts, isScheduledForFuture, isPublished};
