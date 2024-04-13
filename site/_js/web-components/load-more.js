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

import {BaseElement} from './base-element';
import {html} from 'lit-element';
import {unsafeHTML} from 'lit-html/directives/unsafe-html';
import {unsafeSVG} from 'lit-html/directives/unsafe-svg';
import arrowIcon from '../../_includes/icons/arrow-forward.svg';
import {generateIdSalt} from '../utils/salt';

/**
 * LoadMore class represents a custom element for loading more items.
 * It extends the BaseElement class and uses LitElement for rendering.
 */
export class LoadMore extends BaseElement {
  // Initialize properties for the LoadMore class
  constructor() {
    super();

    // Initialize properties with default values
    this.total = null;
    this.skip = 0;
    this.take = 10;
    this.fetchItems = null; // Callback function for fetching items
    this.initialItems = [];
    this.loadedItems = [];
    this._loading = false;
    this._haveError = false;
    this.i18n = {}; // Internationalization properties
    this._id = `load-more-${generateIdSalt('load-more-')}`; // Generate a unique ID for the element
  }

  /**
   * Defines the properties for the LoadMore class
   * @returns {Object} properties - An object containing the properties of the LoadMore class
   */
  static get properties() {
    return {
      skip: {type: Number, reflect: true}, // The number of items to skip
      take: {type: Number, reflect: true}, // The number of items to take
      total: {type: Number, reflect: true}, // The total number of items
      fetchItems: {type: Function, reflect: false}, // The callback function for fetching items
      _loading: {type: Boolean, state: true}, // Indicates if the load more process is in progress
      i18n: {type: Object, reflect: true}, // Internationalization properties
    };
  }

  /**
   * Called when the element is connected to the DOM
   */
  connectedCallback() {
    super.connectedCallback();

    // Store the initial items as children of the element
    this.initialItems = Array.from(this.children);
    this.skip = this.initialItems.length; // Set the skip value to the number of initial items
  }

  /**
   * Determines if the component should update based on changed properties
   * @param {Map} _changedProperties - A map of changed properties
   * @returns {boolean} - True if the component should update, false otherwise
   */
  shouldUpdate(_changedProperties) {
    // Update the component if 'resolved' is not in the dataset or if _loading has changed
    return !('resolved' in this.dataset) || _changedProperties.has('_loading');
  }

  /**
   * Called when the component is updated
   * @param {Map} _changedProperties - A map of changed properties
   */
  updated(_changedProperties) {
    if (
      'resolved' in this.dataset &&
      _changedProperties.has('_loading') &&
      this._loading === true
    ) {
      // If resolved is in the dataset, _loading has changed, and _loading is true, load more items
      this.updateComplete.then(async () => {
        await this._loadMore();
        this._loading = false;
      });
    }

    super.updated(_changedProperties);
  }

  /**
   * Loads more items using the fetchItems callback function
   */
  async _loadMore() {
    try {
      this._haveError = false; // Reset error state

      const {items, updated_total} = await this.fetchItems(
        this.skip,
        this.take
      ); // Fetch items using the fetchItems callback function

      if (updated_total !== undefined) {
        this.total = updated_total; // Update the total number of items if provided
      }

      this.loadedItems = this.loadedItems.concat(items); // Add fetched items to the loadedItems array

      this.skip += items.length; // Increment the skip value

      this.dispatchEvent(
        new CustomEvent('items-loaded', {
          detail: items,
        })
      ); // Dispatch an items-loaded event with the loaded items as detail
    } catch (e) {
      this._haveError = true; // Set error state if an error occurs
    }
  }

  /**
   * Restarts the load more process by resetting properties
   */
  restart() {
    this.loadedItems = [];
    this.initialItems = [];
    this.skip = 0;
    this._loading = true;
  }

  /**
   * Renders an error message if an error occurred during the load more process
   * @returns {TemplateResult} - A template result with the error message
   */
  _renderError() {
    if (!this._haveError) return null; // Return null if no error occurred

    return html`
      <p class="load-more__error color-red-medium gap-top-300">
        ${this.i18n.errorMessage}
        <a
          href="https://github.com/GoogleChrome/developer.chrome.com/issues/new?labels=bug&template=bug_report.md"
          class="color-red-medium"
        >
          ${this.i18n.errorLinkLabel}
        </a>
      </p>
    `;
  }

  /**
   * Handles the click event
