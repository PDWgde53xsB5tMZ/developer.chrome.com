/*
 * Copyright 2022 Google LLC
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

const test = require('ava'); // Importing the Ava testing framework for running tests
const {withPage, addPageScript} = require('../../../../puppeteer'); // Importing helper functions from Puppeteer for working with browser pages
const {html} = require('common-tags'); // Importing the html function from common-tags for creating multi-line HTML strings

// -----------------------------------------------------------------------------
// Test: load-more: can load additional items
// -----------------------------------------------------------------------------
test('load-more: can load additional items', withPage, async (t, page) => {
  // Setting the content of the current page to a predefined HTML string
  await page.setContent(html`
    <load-more
      total="6"
      i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":""}'
    >
      <div class="load-more__item">Initial item</div>
      <div class="load-more__item">Initial item</div>
      <div class="load-more__item">Initial item</div>
    </load-more>
  `);

  // Adding a script to the page's context
  await addPageScript(page, '_load-more.js');

  // Defining a function to be executed in the page's context
  await page.evaluate(() => {
    const items = [
      '<div class="load-more__item">Initial item</div>',
      '<div class="load-more__item">Initial item</div>',
      '<div class="load-more__item">Initial item</div>',
      '<div class="load-more__item">Loaded item</div>',
      '<div class="load-more__item">Loaded item</div>',
      '<div class="load-more__item">Loaded item</div>',
    ];

    document.querySelector('load-more').fetchItems = (skip, take) => {
      return {
        items: items.slice(skip, take + skip),
      };
    };
  });

  // Finding a button element and clicking it
  const button = await page.$('button');
  await button.click();

  // Evaluating JavaScript code in the page's context and returning the result
  const numItems = await page.evaluate(() => {
    return document.querySelectorAll('.load-more__item').length;
  });

  // Checking if the number of items on the page is equal to the expected value
  t.is(numItems, 6);
});

// -----------------------------------------------------------------------------
// Test: load-more: hides button on last page
// -----------------------------------------------------------------------------
test('load-more: hides button on last page', withPage, async (t, page) => {
  // Setting the content of the current page to a predefined HTML string
  await page.setContent(html`
    <load-more
      total="2"
      i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":""}'
    >
      <div class="load-more__item">Initial item</div>
    </load-more>
  `);

  // Adding a script to the page's context
  await addPageScript(page, '_load-more.js');

  // Defining a function to be executed in the page's context
  await page.evaluate(() => {
    const items = [
      '<div class="load-more__item">Initial item</div>',
      '<div class="load-more__item">Loaded item</div>',
    ];

    document.querySelector('load-more').fetchItems = (skip, take) => {
      return {
        items: items.slice(skip, take + skip),
      };
    };
  });

  // Finding a button element and clicking it
  const button = await page.$('button');
  await button.click();

  // Evaluating JavaScript code in the page's context and returning the result
  const haveButton = await page.evaluate(() => {
    return document.querySelectorAll('button').length > 0;
  });

  // Checking if the button is no longer present on the page
  t.is(haveButton, false);
});

// -----------------------------------------------------------------------------
// Test: load-more: supports custom number of items per load
// -----------------------------------------------------------------------------
test(
  'load-more: supports custom number of items per load',
  withPage,
  async (t, page) => {
    // Setting the content of the current page to a predefined HTML string
    await page.setContent(html`
      <load-more
        total="5"
        take="1"
        i18n='{"buttonLabel":"","errorMessage":"","errorLinkLabel":"","noResultsMessage":""}'
      >
        <div class="load-more__item">Initial item</div>
        <div class="load-more__item">Initial item</div>
      </load-more>
    `);

    // Adding a script to the page's context
    await addPageScript(page, '_load-more.js');

    // Defining a function to be executed in the page's context
    await page.evaluate(() => {
      const all = [
        '<div class="load-more__item">Initial item</div>',
        '<div class="load-more__item">Initial item</div>',
        '<div class="load-more__item">Loaded item</div>',
        '<div class="load-more__item">Loaded item
